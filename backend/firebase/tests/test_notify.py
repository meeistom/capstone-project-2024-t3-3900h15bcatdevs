from ..notify import *

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate("../.key/key.json") # MIGHT CHANGE TO key2.json WHEN MERGING BUT PROBABLY NOT
    fba.initialize_app(cred)

fs_client = firestore.client()

# CLEAR COLLECTIONS USING `db_control.py` BEFORE RUNNING TESTS

def test_get_milk_updates():
    # Test 1: Check the function works
    assert type(get_milk_updates(fs_client)) == list