from ..verify import *

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate("../.key/key.json") # MIGHT CHANGE TO key2.json WHEN MERGING BUT PROBABLY NOT
    fba.initialize_app(cred)

fs_client = firestore.client()

# CLEAR COLLECTIONS USING `db_control.py` BEFORE RUNNING TESTS

def test_verify():
    # Test 1: Existing milk uid
    result = verify(fs_client, 'm010')
    assert type(result) == tuple
    assert result[0] == True
    assert type(result[1]) == dict

    # Test 2: Non existent milk uid
    result = verify(fs_client, 'm111')
    assert type(result) == tuple
    assert result[0] == False
    assert type(result[1]) == dict

def test_verify_feed():
    # Test 1: Valid match and not expired
    result = verify_feed(
        fs_client,
        'm010',
        '6467'
    )
    assert type(result) == tuple
    assert result[0] == True
    assert type(result[1]) == dict

    # Test 2: Valid match and expired
    result = verify_feed(
        fs_client,
        'm011',
        '6467'
    )
    assert type(result) == tuple
    assert result[0] == False
    assert type(result[1]) == dict

    # Test 3: Invalid match and not expired
    result = verify_feed(
        fs_client,
        'm010',
        '5049'
    )
    assert type(result) == tuple
    assert result[0] == False
    assert type(result[1]) == dict

    # Test 4: Invalid match and expired
    result = verify_feed(
        fs_client,
        'm011',
        '5049'
    )
    assert type(result) == tuple
    assert result[0] == False
    assert type(result[1]) == dict

    # Test 6: Incorrect barcode (milk_uid)
    assert verify_feed(
        fs_client,
        'm111',
        '6467'
    ) == (False, { 'error': 'Invalid milk barcode' })

    # Test 7: Incorrect barcode (baby_mrn)
    assert verify_feed(
        fs_client,
        'm010',
        '0000'
    ) == (False, { 'error': 'Invalid baby barcode' })
    