from ..add import add_milk_entry
from ..error_check import *

from datetime import datetime
from time import sleep

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate(".key/key2.json")
    fba.initialize_app(cred)

fs_client = firestore.client()

def test_has_valid_request_data_fields():
    # Test 1: Correct fields
    assert has_valid_request_data_fields(
        'mothers',
        {
            'mrn': 'whatever',
            'first_name': 'whatever',
            'last_name': 'whatever'
        }
    ) == True

    assert has_valid_request_data_fields(
        'babies',
        {
            'mrn': 'whatever',
            'first_name': 'whatever',
            'last_name': 'whatever',
            'mother_mrn': 'whatever'
        }
    ) == True

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == True

    # Test 2: Incorrect object given
    assert has_valid_request_data_fields(
        'exists not',
        {
            'a': 'a'
        }
    ) == False

    # Test 3: Incorrect fields - mothers
    assert has_valid_request_data_fields(
        'mothers',
        {
            'mr': 'whatever',
            'first_name': 'whatever',
            'last_name': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'mothers',
        {
            'mrn': 'whatever',
            'firstname': 'whatever',
            'last_name': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'mothers',
        {
            'mrn': 'whatever',
            'first_name': 'whatever',
            'lastname': 'whatever'
        }
    ) == False

    # Test 4: Incorrect fields - babies
    assert has_valid_request_data_fields(
        'babies',
        {
            'mr': 'whatever',
            'first_name': 'whatever',
            'last_name': 'whatever',
            'mother_mrn': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'babies',
        {
            'mrn': 'whatever',
            'firstname': 'whatever',
            'last_name': 'whatever',
            'mother_mrn': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'babies',
        {
            'mrn': 'whatever',
            'first_name': 'whatever',
            'lastname': 'whatever',
            'mother_mrn': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'babies',
        {
            'mrn': 'whatever',
            'first_name': 'whatever',
            'last_name': 'whatever',
            'mothermrn': 'whatever'
        }
    ) == False

    # Test 5: Incorrect fields - milk_entries
    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milktype': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'expresstime': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expirationtime': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storagetype': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storagelocation': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volumeml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'babymrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extranotes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additivesss': 'whatever'
        }
    ) == False

    # Test 6: Missing fields - mothers
    assert has_valid_request_data_fields(
        'mothers',
        {
            'first_name': 'whatever',
            'last_name': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'mothers',
        {
            'mrn': 'whatever',
            'last_name': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'mothers',
        {
            'mrn': 'whatever',
            'first_name': 'whatever'
        }
    ) == False

    # Test 7: Missing fields - babies
    assert has_valid_request_data_fields(
        'babies',
        {
            'first_name': 'whatever',
            'last_name': 'whatever',
            'mother_mrn': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'babies',
        {
            'mrn': 'whatever',
            'last_name': 'whatever',
            'mother_mrn': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'babies',
        {
            'mrn': 'whatever',
            'first_name': 'whatever',
            'mother_mrn': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'babies',
        {
            'mrn': 'whatever',
            'first_name': 'whatever',
            'last_name': 'whatever'
        }
    ) == False

    # Test 8: Missing fields - milk_entries
    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'extra_notes': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'additives': 'whatever'
        }
    ) == False

    assert has_valid_request_data_fields(
        'milk_entries',
        {
            'milk_type': 'whatever',
            'express_time': 'whatever',
            'expiration_time': 'whatever',
            'storage_type': 'whatever',
            'storage_location': 'whatever',
            'volume_ml': 'whatever',
            'baby_mrn': 'whatever',
            'extra_notes': 'whatever'
        }
    ) == False

def test_exists_in_collection():
    # Test 1: Correct fields
    assert exists_in_collection(
        fs_client,
        'mothers',
        '4852'
    ) == True

    assert exists_in_collection(
        fs_client,
        'babies',
        '5049'
    ) == True

    assert exists_in_collection(
        fs_client,
        'milk_entries',
        'm005'
    ) == True

    assert exists_in_collection(
        fs_client,
        'history',
        '000000'
    ) == True

    # Test 2: Non existent mrn/uid
    assert exists_in_collection(
        fs_client,
        'mothers',
        '0000'
    ) == False

    assert exists_in_collection(
        fs_client,
        'babies',
        '0000'
    ) == False

    assert exists_in_collection(
        fs_client,
        'milk_entries',
        'm111'
    ) == False

    assert exists_in_collection(
        fs_client,
        'history',
        'm111'
    ) == False

    # Test 3: Invalid collection name
    assert exists_in_collection(
        fs_client,
        'whatever',
        '0000'
    ) == False

    # Test 4: 0 length mrn/uid
    assert exists_in_collection(
        fs_client,
        'mothers',
        ''
    ) == False

    assert exists_in_collection(
        fs_client,
        'babies',
        ''
    ) == False

    assert exists_in_collection(
        fs_client,
        'milk_entries',
        ''
    ) == False

    assert exists_in_collection(
        fs_client,
        'history',
        ''
    ) == False

def test_exists_in_db():
    # Test 1: Existing mrn/uid
    assert exists_in_db(
        fs_client,
        '4852'
    ) == (True, 'mothers')

    assert exists_in_db(
        fs_client,
        '5049'
    ) == (True, 'babies')

    assert exists_in_db(
        fs_client,
        'm005'
    ) == (True, 'milk_entries')

    # Test 2: Non existent mrn/uid
    assert exists_in_db(
        fs_client,
        'whatever'
    ) == (False, None)

def test_is_milk_expired():
    # Test 1: Non expired milk
    assert is_milk_expired(
        fs_client,
        'm010'
    )[0] == False

    # Test 2: Expired milk
    milk_entry = {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 1,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a test',
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }
    uid = add_milk_entry(fs_client, milk_entry)[1]['uid']
    
    sleep(2)

    assert is_milk_expired(
        fs_client,
        uid
    )[0] == True

def test_is_valid_event_data():
    # Test 1: Correct event data
    assert is_valid_event_data(
        {
            'type': 'Verification',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == True

    assert is_valid_event_data(
        {
            'type': 'Baby Registered',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == True

    assert is_valid_event_data(
        {
            'type': 'Milk Expiration',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == True

    assert is_valid_event_data(
        {
            'type': 'Milk Added',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == True

    assert is_valid_event_data(
        {
            'type': 'Milk Deleted',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == True

    # Test 2: Incorrect field names
    assert is_valid_event_data(
        {
            'typeee': 'Verification',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == False

    assert is_valid_event_data(
        {
            'type': 'Verification',
            'messageee': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == False

    assert is_valid_event_data(
        {
            'type': 'Verification',
            'message': 'whatever',
            'detailsss': {'a': 'a'},
            'timestamp': 0
        }
    ) == False

    assert is_valid_event_data(
        {
            'type': 'Verification',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamppp': 0
        }
    ) == False

    # Test 3: Missing field names
    assert is_valid_event_data(
        {
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == False

    assert is_valid_event_data(
        {
            'type': 'Verification',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == False

    assert is_valid_event_data(
        {
            'type': 'Verification',
            'message': 'whatever',
            'timestamp': 0
        }
    ) == False

    assert is_valid_event_data(
        {
            'type': 'Verification',
            'message': 'whatever',
            'details': {'a': 'a'}
        }
    ) == False

    # Test 4: Incorrect field types
    assert is_valid_event_data(
        {
            'type': 0,
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == False

    assert is_valid_event_data(
        {
            'type': 'Verification',
            'message': 0,
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == False

    assert is_valid_event_data(
        {
            'type': 'Verification',
            'message': 'whatever',
            'details': 0,
            'timestamp': 0
        }
    ) == False

    assert is_valid_event_data(
        {
            'type': 'Verification',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 'a'
        }
    ) == False

    # Test 5: Incorrect event type
    assert is_valid_event_data(
        {
            'type': 'not an event',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == False