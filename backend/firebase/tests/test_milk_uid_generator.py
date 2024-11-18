from ..milk_uid_generator import *

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate(".key/key2.json")
    fba.initialize_app(cred)

fs_client = firestore.client()

def test_get_new_milk_uid():
    # Test 1: Check the function works
    assert get_new_milk_uid(fs_client) == (True, 'm012')

    # Can't test case where stats collection and counters document don't exist 
    # since we don't have a function to delete them and recreate them