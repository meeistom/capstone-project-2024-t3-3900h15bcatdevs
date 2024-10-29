from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

import firebase_admin as fba
from firebase_admin import firestore, credentials

from firebase.add import *
from firebase.delete import *
from firebase.retrieve import *
from firebase.error_check import *
from firebase.verify import *

cred = credentials.Certificate('./.key/key.json')
fba.initialize_app(cred)
fs_client = firestore.client()

"""
Basic Skeleton for a Flask app that you can use in a docker container.
"""

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

@app.route('/')
def passes():
    return 'DEFAULT'

# Fetches all mothers as a list, or fetches mother object by MRN
@app.route('/mothers', methods=['GET'], strict_slashes=False)
def get_mother():
    mrn = request.args.get('mrn')
    if mrn:
        mother_data = retrieve_mother_by_mrn(fs_client, mrn)
    else:
        mother_data = retrieve_all_mothers(fs_client)

    if len(mother_data) == 0:
        return make_response(
            "Mother MRN not found!" if mrn else "No Mothers Registered",
            400 if mrn else 200
        )
    else:
        return make_response(
            jsonify(mother_data),
            200
        )

# Fetches all babies as a list, or fetches baby object by MRN
@app.route('/babies', methods=['GET'], strict_slashes=False)
def get_baby():
    mrn = request.args.get('mrn')
    if mrn:
        baby_data = retrieve_baby_by_mrn(fs_client, mrn)
    else:
        baby_data = retrieve_all_babies(fs_client)

    if len(baby_data) == 0:
        return make_response(
            "Baby MRN not found!" if mrn else "No Babies Registered",
            400 if mrn else 200
        )
    else:
        return make_response(
            jsonify(baby_data),
            200
        )

#  Fetches all milk entries as a list, or fetches milk entry object by UID
@app.route('/milk_entries', methods=['GET'], strict_slashes=False)
def get_milk_entry():
    uid = request.args.get('uid')
    if uid:
        milk_entry_data = retrieve_milk_entry_by_uid(fs_client, uid)
    else:
        milk_entry_data = retrieve_all_milk_entries(fs_client)

    if len(milk_entry_data) == 0:
        return make_response(
            "Milk Entry UID not found!" if uid else "No Milk Entries Registered",
            400 if uid else 200
        )
    else:
        return make_response(
            jsonify(milk_entry_data),
            200
        )

# Adds a new mother
@app.route('/add_mother', methods=['POST'])
def add_new_mother():
    new_mother_data = request.get_json()
    
    success, message = add_mother(fs_client, new_mother_data)
    
    return make_response(
        message,
        200 if success else 400
    )

# Adds a new baby
@app.route('/add_baby', methods=['POST'])
def add_new_baby():
    new_baby_data = request.get_json()

    success, message = add_baby(fs_client, new_baby_data)
    
    return make_response(
        message,
        200 if success else 400
    )

# Adds a new milk entry
@app.route('/add_milk_entry', methods=['POST'])
def add_new_milk_entry():
    new_milk_entry_data = request.get_json()

    success, message = add_milk_entry(fs_client, new_milk_entry_data)
    print(message)
    return make_response(
        message,
        200 if success else 400
    )


# Deletes a mother
@app.route('/delete_mother', methods=['DELETE'])
def delete_mother_by_mrn():
    mrn = request.args.get('mrn')

    success, message = delete_document(fs_client, mother_mrn=mrn)

    return make_response(
        message,
        200 if success else 500
    )

# Deletes a baby
@app.route('/delete_baby', methods=['DELETE'])
def delete_baby_by_mrn():
    mrn = request.args.get('mrn')

    success, message = delete_document(fs_client, baby_mrn=mrn)

    return make_response(
        message,
        200 if success else 500
    )

# Deletes a milk entry
@app.route('/delete_milk_entry', methods=['DELETE'])
def delete_milk_entry_by_uid():
    uid = request.args.get('uid')

    success, message = delete_document(fs_client, milk_entry_uid=uid)

    return make_response(
        message,
        200 if success else 500
    )

@app.route('/verify', methods=['GET'])
def route_verify():
    barcode = request.args.get('barcode')

    if barcode:
        success, message = verify(fs_client, barcode)
    else:
        success, message = False, "Invalid Request. No inputs given"

    return make_response(
        message, # JSON if barcode provided. String if not.
        200 if success else 404
    )

@app.route('/verify_feed', methods=['GET'])
def route_verify_feed():
    milk_uid = request.args.get('milk_uid')
    baby_mrn = request.args.get('baby_mrn')

    if milk_uid and baby_mrn:
        success, message = verify_feed(fs_client, milk_uid, baby_mrn)
    else:
        success, message = False, "Invalid Request. Incorrect inputs given"

    error_code = 404 if 'error' in message else 400

    return make_response(
        message, # JSON if inputs provided. String if not.
        200 if success else error_code
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
