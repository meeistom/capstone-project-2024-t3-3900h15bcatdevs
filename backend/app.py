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

######### Uncomment to direct to the right key
cred = credentials.Certificate('./firebase/key_gabe.json')
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

# inserts mother's details
@app.route('/add_mother', methods=['POST'])
def add_new_mother():
    new_mother_data = request.get_json()
    
    # Generate new MRN for mother?

    success = add_mother(fs_client,
                         new_mother_data['mrn'],
                         new_mother_data['first_name'],
                         new_mother_data['last_name'])
    
    return make_response(
        "Successfully added mother" if success else "Failed to add mother",
        200 if success else 400
    )


# inserts baby details
@app.route('/database/insert_baby', methods=['POST'])
def insert_baby():
    # data = request.get_json()
    # result = insert_baby_data(data)
    # return jsonify(result)
    pass

# inserts milk bottle details
@app.route('/database/insert_bottle', methods=['POST'])
def insert_bottle():
    # data = request.get_json()
    # print(data)

    # milk_type = data.get('milk_type', 'default_type') 
    # bottle_quantity = data.get('bottle_quantity', 0) 
    # express_time = data.get('express_time', None)  
    # storage_method = data.get('storage_method', 'default_method')  
    # storage_location = data.get('storage_location', 'default_location')  
    # extra_notes = data.get('extra_notes', '') 
    # barcode = data.get('barcode', None)  
    # mother_id = data['mother_id']

    # result = insert_bottle_data(milk_type, bottle_quantity, express_time, storage_method, storage_location, extra_notes, barcode, mother_id)
    # return jsonify(result)
    pass


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
