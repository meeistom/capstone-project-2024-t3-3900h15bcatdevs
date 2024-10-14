from flask import Flask, request, jsonify
from flask_cors import CORS
from database.fetch_mother import fetch_mother_data, fetch_mother_data_by_barcode
from database.insert_mother import insert_mother_data
from database.fetch_baby import fetch_baby_data
from database.insert_baby import insert_baby_data
from database.insert_bottle import insert_bottle_data

import firebase_admin as fba
from firebase_admin import firestore, credentials
from firebase.add_entry import *
from firebase.delete_entry import *
from firebase.get_entry import *

######### Uncomment to direct to the right key
cred = credentials.Certificate('./key_gabe.json')
# cred = credentials.Certificate('./key_cynthia.json')
# cred = credentials.Certificate('./key_aolin.json')
# cred = credentials.Certificate('./key_parker.json')
# cred = credentials.Certificate('./key_tom.json')
# cred = credentials.Certificate('./key_parker.json')

fba.initialize_app(cred)
fs_client = firestore.client()

"""
Basic Skeleton for a Flask app that you can use in a docker container.
"""

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

@app.route('/')
def passes():
    return 'PASSED'

# returns all mother details
@app.route('/database/fetch_mother', methods=['GET'])
def get_mother_data():
    data = fetch_mother_data()
    return jsonify(data)

# returns the mothers details with matching barcode
@app.route('/database/fetch_mother/<barcode>', methods=['GET'])
def get_mother_data_by_barcode(barcode):
    data = fetch_mother_data_by_barcode(barcode)
    return jsonify(data)


# inserts mother's details
@app.route('/database/insert_mother', methods=['POST'])
def insert_mother():
    data = request.get_json()
    result = insert_mother_data(data)
    return jsonify(result)

# returns all baby details
@app.route('/database/fetch_baby', methods=['GET'])
def get_baby_data():
    data = fetch_baby_data()
    return jsonify(data)

# inserts baby details
@app.route('/database/insert_baby', methods=['POST'])
def insert_baby():
    data = request.get_json()
    result = insert_baby_data(data)
    return jsonify(result)

# inserts milk bottle details
@app.route('/database/insert_bottle', methods=['POST'])
def insert_bottle():
        data = request.get_json()
        print(data)

        milk_type = data.get('milk_type', 'default_type') 
        bottle_quantity = data.get('bottle_quantity', 0) 
        express_time = data.get('express_time', None)  
        storage_method = data.get('storage_method', 'default_method')  
        storage_location = data.get('storage_location', 'default_location')  
        extra_notes = data.get('extra_notes', '') 
        barcode = data.get('barcode', None)  
        mother_id = data['mother_id']

        result = insert_bottle_data(milk_type, bottle_quantity, express_time, storage_method, storage_location, extra_notes, barcode, mother_id)
        return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
