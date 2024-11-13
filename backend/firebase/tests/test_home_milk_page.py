from ..home_milk_page import *

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate("../.key/key.json") # MIGHT CHANGE TO key2.json WHEN MERGING BUT PROBABLY NOT
    fba.initialize_app(cred)

fs_client = firestore.client()

# CLEAR COLLECTIONS USING `db_control.py` BEFORE RUNNING TESTS

def test_get_home_page_formatted_milks():
    # Test 1: Check function works
    result = get_home_page_formatted_milks(fs_client)
    assert result[0] == True
    assert result[1][0]['uid'] == '000011'
    assert result[1][-1]['uid'] == '000002'