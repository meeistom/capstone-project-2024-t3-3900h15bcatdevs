from ..edit import *
from datetime import datetime

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate("../.key/key.json") # MIGHT CHANGE TO key2.json WHEN MERGING BUT PROBABLY NOT
    fba.initialize_app(cred)

fs_client = firestore.client()

# CLEAR COLLECTIONS USING `db_control.py` BEFORE RUNNING TESTS

def test_edit_entry():
    # Test 1: Correct fields
    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (True, "(EDIT) Document updated successfully")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        },
        collection_name='milk_entries'
    ) == (True, "(EDIT) Document updated successfully")

    # Test 2: Incorrect collection name
    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        },
        collection_name='mothers'
    ) == (False, "(EDIT) Only editing milk entries is supported")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        },
        collection_name='babies'
    ) == (False, "(EDIT) Only editing milk entries is supported")
    
    # Test 3: uid does not exist
    assert edit_entry(
        fs_client,
        'm111',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) MRN/UID does not exist")

    # Test 4: Incorrect field names
    assert edit_entry(
        fs_client,
        'm010',
        {
            'milktype': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'expresstime': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expirationtime': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storagetype': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storagelocation': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volumeml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'babymrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extranotes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additivessssss': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    # Test 5: Missing field names
    assert edit_entry(
        fs_client,
        'm010',
        {
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")
    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Invalid request data fields")

    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) + 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
        }
    ) == (False, "(EDIT) Invalid request data fields")

    # Test 6: Expiration before current time
    assert edit_entry(
        fs_client,
        'm010',
        {
            'milk_type': 'defrosted',
            'express_time': int(datetime.now().timestamp()),
            'expiration_time': int(datetime.now().timestamp()) - 86400,
            'storage_type': 'fridge',
            'storage_location': 'Room 2',
            'volume_ml': 707,
            'baby_mrn': '5049',
            'extra_notes': 'this has been edited',
            'additives': ['cream']
        }
    ) == (False, "(EDIT) Expiration time cannot be before current time")