from flask import Flask, request, jsonify
from flask_cors import CORS
from database.fetch_mother import fetch_mother_data, fetch_mother_data_by_barcode
from database.insert_mother import insert_mother_data
from database.fetch_baby import fetch_baby_data
from database.insert_baby import insert_baby_data

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
