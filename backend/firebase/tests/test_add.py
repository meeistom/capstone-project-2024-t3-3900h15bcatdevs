from ..add import *
from datetime import datetime

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate(".key/key.json") # MIGHT CHANGE TO key2.json WHEN MERGING BUT PROBABLY NOT
    fba.initialize_app(cred)

fs_client = firestore.client()

# CLEAR COLLECTIONS USING `db_control.py` BEFORE RUNNING TESTS

def test_add_mother():
    # Test 1: Correct fields
    assert add_mother(fs_client, {
        'mrn': '7357',
        'first_name': 'test first mother',
        'last_name': 'test last mother',
        'babies': [],
        'milks': []
    }) == (True, "Successfully added mother")

    # Test 2: Incorrect fields
    assert add_mother(fs_client, {
        'mr': '7358',
        'first_name': 'test first mother',
        'last_name': 'test last mother',
        'babies': [],
        'milks': []
    }) == (False, "Invalid mother data")

    assert add_mother(fs_client, {
        'mrn': '7358',
        'firstname': 'test first mother',
        'last_name': 'test last mother',
        'babies': [],
        'milks': []
    }) == (False, "Invalid mother data")

    assert add_mother(fs_client, {
        'mrn': '7358',
        'first_name': 'test first mother',
        'lastname': 'test last mother',
        'babies': [],
        'milks': []
    }) == (False, "Invalid mother data")

    # Test 3: Missing fields
    assert add_mother(fs_client, {
        'first_name': 'test first mother',
        'last_name': 'test last mother',
        'babies': [],
        'milks': []
    }) == (False, "Invalid mother data")

    assert add_mother(fs_client, {
        'mrn': '7358',
        'last_name': 'test last mother',
        'babies': [],
        'milks': []
    }) == (False, "Invalid mother data")

    assert add_mother(fs_client, {
        'mrn': '7358',
        'first_name': 'test first mother',
        'babies': [],
        'milks': []
    }) == (False, "Invalid mother data")

    # Test 4: Duplicate mrn
    assert add_mother(fs_client, {
        'mrn': '7357',
        'first_name': 'test first mother',
        'last_name': 'test last mother',
        'babies': [],
        'milks': []
    }) == (False, "Mother already exists")

def test_add_baby():
    # Test 1: Correct fields
    assert add_baby(fs_client, {
         'mrn': '6467',
         'first_name': 'test first baby',
         'last_name': 'test last baby',
         'mother_mrn': '7357'
    }) == (True, "Successfully added baby")

    # Test 2: Incorrect fields
    assert add_baby(fs_client, {
         'mr': '6468',
         'first_name': 'test first baby',
         'last_name': 'test last baby',
         'mother_mrn': '7357'
    }) == (False, "Invalid baby data")

    assert add_baby(fs_client, {
         'mrn': '6468',
         'firstname': 'test first baby',
         'last_name': 'test last baby',
         'mother_mrn': '7357'
    }) == (False, "Invalid baby data")

    assert add_baby(fs_client, {
         'mrn': '6468',
         'first_name': 'test first baby',
         'lastname': 'test last baby',
         'mother_mrn': '7357'
    }) == (False, "Invalid baby data")

    assert add_baby(fs_client, {
         'mrn': '6468',
         'first_name': 'test first baby',
         'last_name': 'test last baby',
         'mothermrn': '7357'
    }) == (False, "Invalid baby data")

    # Test 3: Missing fields
    assert add_baby(fs_client, {
         'first_name': 'test first baby',
         'last_name': 'test last baby',
         'mother_mrn': '7357'
    }) == (False, "Invalid baby data")

    assert add_baby(fs_client, {
         'mrn': '6468',
         'last_name': 'test last baby',
         'mother_mrn': '7357'
    }) == (False, "Invalid baby data")

    assert add_baby(fs_client, {
         'mrn': '6468',
         'first_name': 'test first baby',
         'mother_mrn': '7357'
    }) == (False, "Invalid baby data")

    assert add_baby(fs_client, {
         'mrn': '6468',
         'first_name': 'test first baby',
         'last_name': 'test last baby',
    }) == (False, "Invalid baby data")

    # Test 4: Mother does not exist
    assert add_baby(fs_client, {
         'mrn': '6468',
         'first_name': 'test first baby',
         'last_name': 'test last baby',
         'mother_mrn': '0000'
    }) == (False, "Mother does not exist")

    # Test 5: Duplicate baby mrn
    assert add_baby(fs_client, {
         'mrn': '6467',
         'first_name': 'test first baby',
         'last_name': 'test last baby',
         'mother_mrn': '7357'
    }) == (False, "Baby already exists")

def test_add_milk():
    # Test 1: Correct fields
    milk_entry = {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a test',
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }
    home_milk_entry = milk_entry
    home_milk_entry['uid'] = 'm010'
    home_milk_entry['baby_name'] = 'test first baby test last baby'
    home_milk_entry['mother_name'] = 'test first mother test last mother'
    result = add_milk_entry(fs_client, milk_entry)
    del result[1]['created_at']
    assert result == (True, home_milk_entry)

    # Test 2: Incorrect fields
    assert add_milk_entry(fs_client, {
        'milktype': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'expresstime': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expirationtime': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storagetype': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storagelocation': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volumeml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'babymrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extranotes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additivesssssss': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    # Test 3: Missing fields
    assert add_milk_entry(fs_client, {
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Invalid milk entry data")

    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
    }) == (False, "(ADD MILK) Invalid milk entry data")

    # Test 4: Milk already expired
    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) - 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '6467',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Expiration time is in the past")

    # Test 5: Baby mrn doesn't exist
    assert add_milk_entry(fs_client, {
        'milk_type': 'fresh',
        'express_time': int(datetime.now().timestamp()),
        'expiration_time': int(datetime.now().timestamp()) + 86400,
        'storage_type': 'freezer',
        'storage_location': 'Room 3',
        'volume_ml': 808,
        'baby_mrn': '8080',
        'mother_mrn': '7357',
        'extra_notes': 'this is a failed test',
        'created_at': int(datetime.now().timestamp()),
        'expired': False,
        'additives': ['hmf', 'humavant6']
    }) == (False, "(ADD MILK) Baby does not exist")



    