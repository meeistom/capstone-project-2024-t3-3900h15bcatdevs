from ..expiration_handler import *

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate(".key/key2.json")
    fba.initialize_app(cred)

fs_client = firestore.client()

def test_check_milk_thread_function():
    # Test 1: Stub
    assert 1 == 1