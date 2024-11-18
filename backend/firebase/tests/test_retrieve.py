from ..retrieve import *

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate("../.key/key.json") # MIGHT CHANGE TO key2.json WHEN MERGING BUT PROBABLY NOT
    fba.initialize_app(cred)

fs_client = firestore.client()

# CLEAR COLLECTIONS USING `db_control.py` BEFORE RUNNING TESTS

def test_retrieve_from_collection():
    # Test 1: Valid parameter values
    result = retrieve_from_collection(
        fs_client,
        'mothers',
    )
    assert type(result) == list
    assert len(result) > 0

    # BROKEN TEST RN
    # result = retrieve_from_collection(
    #     fs_client,
    #     'babies',
    # )
    # assert type(result) == list
    # assert len(result) > 0

    result = retrieve_from_collection(
        fs_client,
        'milk_entries',
    )
    assert type(result) == list
    assert len(result) > 0

    result = retrieve_from_collection(
        fs_client,
        'history',
    )
    assert type(result) == list
    assert len(result) > 0

    result = retrieve_from_collection(
        fs_client,
        'mothers',
        '4852'
    )
    assert type(result) == list
    assert len(result) > 0

    result = retrieve_from_collection(
        fs_client,
        'babies',
        '5049'
    )
    assert type(result) == list
    assert len(result) > 0

    result = retrieve_from_collection(
        fs_client,
        'milk_entries',
        'm005'
    )
    assert type(result) == list
    assert len(result) > 0

    result = retrieve_from_collection(
        fs_client,
        'history',
        '000025'
    )
    assert type(result) == list
    assert len(result) > 0

    result = retrieve_from_collection(
        fs_client,
        'milk_entries',
        order='ASC'
    )
    assert type(result) == list
    assert len(result) > 0

    # Test 2: mrn/uid does not exist
    result = retrieve_from_collection(
        fs_client,
        'mothers',
        '0000'
    )
    assert type(result) == list
    assert len(result) == 0

    result = retrieve_from_collection(
        fs_client,
        'babies',
        '0000'
    )
    assert type(result) == list
    assert len(result) == 0

    result = retrieve_from_collection(
        fs_client,
        'milk_entries',
        'm111'
    )
    assert type(result) == list
    assert len(result) == 0

    result = retrieve_from_collection(
        fs_client,
        'history',
        '111111'
    )
    assert type(result) == list
    assert len(result) == 0

def test_get_mother_name():
    # Test 1: Baby mrn exists
    assert get_mother_name(fs_client, '5049') == 'Lynelle Bentote'

    # Test 2: Baby mrn does not exist
    assert get_mother_name(fs_client, '0000') == ''

def test_get_baby_names():
    # Test 1: Mother mrn exists
    assert get_baby_names(fs_client, '6361') == ['Agnes Baistow', 'Lori Coat']
    assert get_baby_names(fs_client, '5587') == ['Clarisse Willsmore']
    assert get_baby_names(fs_client, '2055') == []

    # Test 2: Mother mrn does not exist
    assert get_baby_names(fs_client, '0000') == []

def test_get_full_name():
    # Test 1: The mrn exists
    assert get_full_name(fs_client, '5049') == (True, 'Agnes Baistow')
    assert get_full_name(fs_client, '6361') == (True, 'Lynelle Bentote')

    # Test 2: The mrn does not exist
    assert get_full_name(fs_client, '0000') == (False, "MRN does not exist in mothers or babies collections")
