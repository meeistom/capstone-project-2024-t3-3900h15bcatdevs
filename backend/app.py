from flask import Flask, jsonify
from flask_cors import CORS
from database.get_mother import fetch_mother_data

"""
Basic Skeleton for a Flask app that you can use in a docker container.
"""

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

@app.route('/')
def passes():
    return 'PASSED'

@app.route('/database/fetch_mother', methods=['GET'])
def get_mother_data():
    data = fetch_mother_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
