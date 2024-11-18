from ..home_page import *

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate(".key/key2.json")
    fba.initialize_app(cred)

fs_client = firestore.client()

def test_get_babies_associated_milks():
    # Test 1: Check function works
    result = get_babies_associated_milks(fs_client)
    assert result[0] == True
    assert result[1][0]['mrn'] == '1215'
    assert result[1][-1]['mrn'] == '9172'
    assert 1 == 1