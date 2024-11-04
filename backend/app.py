from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

import firebase_admin as fba
from firebase_admin import firestore, credentials

from firebase.add import *
from firebase.delete import *
from firebase.retrieve import *
from firebase.error_check import *
from firebase.home_milk_page import *
from firebase.verify import *
from firebase.notify import *
from firebase.search import *

cred = credentials.Certificate("./.key/key2.json")
fba.initialize_app(cred)
fs_client = firestore.client()

"""
Basic Skeleton for a Flask app that you can use in a docker container.
"""

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/")
def passes():
    return 'Hi'

# Homepage shows the formatted milks as default
# Fetches & formats milks with mother and baby info
@app.route("/home", methods=["GET"], strict_slashes=False)
def default_home_milks():

    success, home_page_milks = get_home_page_formatted_milks(fs_client)

    return make_response(jsonify(home_page_milks), 200 if success else 400)


# Fetches all mothers as a list, or fetches mother object by MRN if provided
@app.route("/mothers", methods=["GET"], strict_slashes=False)
def get_mother():
    mrn = request.args.get("mrn")

    mother_data = retrieve_from_collection(fs_client, collection="mothers", mrn_uid=mrn)

    return make_response(
        jsonify(mother_data[0] if mrn and len(mother_data) == 1 else mother_data),
        400 if mrn and len(mother_data) == 0 else 200,
    )


# Fetches all babies as a list, or fetches baby object by MRN if provided
@app.route("/babies", methods=["GET"], strict_slashes=False)
def get_baby():
    mrn = request.args.get("mrn")

    baby_data = retrieve_from_collection(fs_client, collection="babies", mrn_uid=mrn)

    return make_response(
        jsonify(baby_data[0] if mrn and len(baby_data) == 1 else baby_data),
        400 if mrn and len(baby_data) == 0 else 200,
    )


#  Fetches all milk entries as a list and returns it in order (default is DESC), or fetches milk entry object by UID
@app.route("/milk_entries", methods=["GET"], strict_slashes=False)
def get_milk_entry():
    uid = request.args.get("uid")
    order = request.args.get("order")

    if order:
        milk_entry_data = retrieve_from_collection(
            fs_client, collection="milk_entries", order=order
        )
    else:
        milk_entry_data = retrieve_from_collection(
            fs_client, collection="milk_entries", mrn_uid=uid
        )

    return make_response(
        jsonify(
            milk_entry_data[0] if uid and len(milk_entry_data) == 1 else milk_entry_data
        ),
        400 if uid and len(milk_entry_data) == 0 else 200,
    )


#  Fetches all related mother matches by keyword
@app.route("/mothers/search", methods=["GET"], strict_slashes=False)
def mother_search_by_keyword():
    keyword = request.args.get("keyword")

    search_results = search_by_keyword(fs_client, "mothers", keyword)

    return make_response(
        jsonify(search_results),
        404 if len(search_results) == 0 else 200,
    )


#  Fetches all related baby matches by keyword
@app.route("/babies/search", methods=["GET"], strict_slashes=False)
def babies_search_by_keyword():
    keyword = request.args.get("keyword")

    search_results = search_by_keyword(fs_client, "babies", keyword)

    return make_response(
        jsonify(search_results),
        404 if len(search_results) == 0 else 200,
    )


#  Fetches all related milk matches by keyword
@app.route("/milk_entries/search", methods=["GET"], strict_slashes=False)
def milks_search_by_keyword():
    keyword = request.args.get("keyword")

    search_results = search_by_keyword(fs_client, "milk_entries", keyword)

    return make_response(
        jsonify(search_results),
        404 if len(search_results) == 0 else 200,
    )


# Adds a new mother
@app.route("/add_mother", methods=["POST"])
def add_new_mother():
    new_mother_data = request.get_json()

    success, message = add_mother(fs_client, new_mother_data)

    return make_response(message, 200 if success else 400)


# Adds a new baby
@app.route("/add_baby", methods=["POST"])
def add_new_baby():
    new_baby_data = request.get_json()

    success, message = add_baby(fs_client, new_baby_data)

    return make_response(message, 200 if success else 400)


# Adds a new milk entry
@app.route("/add_milk_entry", methods=["POST"])
def add_new_milk_entry():
    new_milk_entry_data = request.get_json()

    success, message = add_milk_entry(fs_client, new_milk_entry_data)

    return make_response(message, 200 if success else 400)


# Deletes a mother
@app.route("/delete_mother", methods=["DELETE"])
def delete_mother_by_mrn():
    mrn = request.args.get("mrn")

    success, message = delete_document(fs_client, mother_mrn=mrn)

    return make_response(message, 200 if success else 500)


# Deletes a baby
@app.route("/delete_baby", methods=["DELETE"])
def delete_baby_by_mrn():
    mrn = request.args.get("mrn")

    success, message = delete_document(fs_client, baby_mrn=mrn)

    return make_response(message, 200 if success else 500)


# Deletes a milk entry
@app.route("/delete_milk_entry", methods=["DELETE"])
def delete_milk_entry_by_uid():
    uid = request.args.get("uid")

    success, message = delete_document(fs_client, milk_entry_uid=uid)

    return make_response(message, 200 if success else 500)


@app.route("/verify", methods=["GET"])
def route_verify():
    barcode = request.args.get("barcode")

    if barcode:
        success, message = verify(fs_client, barcode)
    else:
        success, message = False, "Invalid Request. No inputs given"

    return make_response(
        message, 200 if success else 404  # JSON if barcode provided. String if not.
    )


@app.route("/verify_feed", methods=["GET"])
def route_verify_feed():
    milk_uid = request.args.get("milk_uid")
    baby_mrn = request.args.get("baby_mrn")

    if milk_uid and baby_mrn:
        success, message = verify_feed(fs_client, milk_uid, baby_mrn)
    else:
        success, message = False, "Invalid Request. Incorrect inputs given"

    error_code = 404 if "error" in message else 400

    return make_response(
        message,  # JSON if inputs provided. String if not.
        200 if success else error_code,
    )


# Provides latest notifications update on statuses of all milks
@app.route("/notifications", methods=["GET"], strict_slashes=False)
def get_update_notifications():

    notifications = get_milk_updates(fs_client)

    return make_response(jsonify(notifications), 200)

# Generate milk label
@app.route('/preview_milk_label', methods=['GET'], strict_slashes=False)
def get_milk_label_preview():
    uid = request.args.get('uid')

    milk = retrieve_milk_entry_by_uid(fs_client, uid)
    baby = retrieve_baby_by_mrn(fs_client, milk['baby_mrn'])
    mother = retrieve_mother_by_mrn(fs_client, baby['mother_mrn'])

    label = get_milk_label((uid, mother['first_name'], baby['last_name'], baby['mrn']))

    return make_response(
        label,
        200
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
