from ..history import *

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate("../.key/key.json") # MIGHT CHANGE TO key2.json WHEN MERGING BUT PROBABLY NOT
    fba.initialize_app(cred)

fs_client = firestore.client()

# CLEAR COLLECTIONS USING `db_control.py` BEFORE RUNNING TESTS

def test_log_event():
    # Test 1: Valid event logs
    assert log_event(
        fs_client,
        'Verification',
        {
            'match': True,
            'expired': False
        }
    ) == True

    assert log_event(
        fs_client,
        'Baby Registered',
        {
            'mother_name': 'test mother name',
            'first_name': 'test baby first',
            'last_name': 'test baby last'
        }
    ) == True

    assert log_event(
        fs_client,
        'Milk Expiration',
        {
            'uid': '111111',
            'baby_mrn': '5049'
        }
    ) == True

    assert log_event(
        fs_client,
        'Milk Added',
        {
            'mother_name': 'test',
            'baby_name': 'test'
        }
    ) == True

    assert log_event(
        fs_client,
        'Milk Deleted',
        {
            'mother_name': 'test',
            'baby_name': 'test'
        }
    ) == True

    # Test 2: Incorrect event type
    assert log_event(
        fs_client,
        'non existent',
        {
            'match': True,
            'expired': False
        }
    ) == False

    # Test 3: Verification mismatch
    assert log_event(
        fs_client,
        'Verification',
        {
            'match': False,
            'expired': False
        }
    ) == True

    # Test 4: Verification expiration
    assert log_event(
        fs_client,
        'Verification',
        {
            'match': True,
            'expired': True
        }
    ) == True

    # Test 5: Verificaiton mismatch and expiration
    assert log_event(
        fs_client,
        'Verification',
        {
            'match': False,
            'expired': True
        }
    ) == True

    # Test 6: Verification error message included
    assert log_event(
        fs_client,
        'Verification',
        {
            'match': True,
            'expired': False,
            'error': 'this is the error message'
        }
    ) == True

def test_log_event_to_firebase():
    # Test 1: Valid event data
    assert log_event_to_firebase(
        fs_client,
        {
            'type': 'Verification',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == True

    assert log_event_to_firebase(
        fs_client,
        {
            'type': 'Baby Registered',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == True

    assert log_event_to_firebase(
        fs_client,
        {
            'type': 'Milk Expiration',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == True

    assert log_event_to_firebase(
        fs_client,
        {
            'type': 'Milk Added',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == True

    assert log_event_to_firebase(
        fs_client,
        {
            'type': 'Milk Deleted',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == True

    # Test 2: Invalid event data
    assert log_event_to_firebase(
        fs_client,
        {
            'type': 'non existent',
            'message': 'whatever',
            'details': {'a': 'a'},
            'timestamp': 0
        }
    ) == False