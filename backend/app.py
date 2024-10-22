from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
# from database.fetch_mother import fetch_mother_data, fetch_mother_data_by_barcode
# from database.insert_mother import insert_mother_data
# from database.fetch_baby import fetch_baby_data
# from database.insert_baby import insert_baby_data
# from database.insert_bottle import insert_bottle_data

import firebase_admin as fba
from firebase_admin import firestore, credentials

from firebase.add import *
from firebase.delete import *
from firebase.retrieve import *
from firebase.error_check import *
from firebase.db_control import *

######### Uncomment to direct to the right key
cred = credentials.Certificate('./firebase/key_sarah.json')
# cred = credentials.Certificate('./firebase/key_cynthia.json')
# cred = credentials.Certificate('./firebase/key_aolin.json')
# cred = credentials.Certificate('./firebase/key_parker.json')
# cred = credentials.Certificate('./firebase/key_tom.json')
# cred = credentials.Certificate('./firebase/key_parker.json')

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
    
    # Generate new MRN for mother?

    success, message = add_mother(fs_client, new_mother_data)
    
    return make_response(
        message,
        200 if success else 400
    )

# Adds a new baby
@app.route('/add_baby', methods=['POST'])
def add_new_baby():
    new_baby_data = request.get_json()

    # Generate new MRN for baby?

    success, message = add_baby(fs_client, new_baby_data)
    
    return make_response(
        message,
        200 if success else 400
    )

# Adds a new milk entry
@app.route('/add_milk_entry', methods=['POST'])
def add_new_milk_entry():
    new_milk_entry_data = request.get_json()

    # Generate new UID for milk entry?

    success, message = add_milk_entry(fs_client, new_milk_entry_data)
    
    return make_response(
        message,
        200 if success else 400
    )

# Deletes a mother
@app.route('/delete_mother', methods=['DELETE'])
def delete_mother_by_mrn():
    mrn = request.args.get('mrn')

    success, message = delete_mother(fs_client, mrn)

    return make_response(
        message,
        200 if success else 500
    )

# Deletes a baby
@app.route('/delete_baby', methods=['DELETE'])
def delete_baby_by_mrn():
    mrn = request.args.get('mrn')

    success, message = delete_baby(fs_client, mrn)

    return make_response(
        message,
        200 if success else 500
    )

# Deletes a milk entry
@app.route('/delete_milk_entry', methods=['DELETE'])
def delete_milk_entry_by_uid():
    uid = request.args.get('uid')

    success, message = delete_milk_entry(fs_client, uid)

    return make_response(
        message,
        200 if success else 500
    )

if __name__ == '__main__':
    #### UNCOMMENT FOR DB CONTROL
    #### WARNING: DESTRUCTIVE STUFF
    # clear_mothers(fs_client)
    # clear_babies(fs_client)
    # clear_milk_entries(fs_client)
    # clear_all_collections(fs_client)

    app.run(host='0.0.0.0', port=5001, debug=True)
