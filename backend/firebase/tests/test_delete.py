from ..delete import *

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate(".key/key.json") # MIGHT CHANGE TO key2.json WHEN MERGING BUT PROBABLY NOT
    fba.initialize_app(cred)

fs_client = firestore.client()

# CLEAR COLLECTIONS USING `db_control.py` BEFORE RUNNING TESTS

def test_delete_document():
    # Test 1: Correct fields
    assert delete_document(
        fs_client,
        mother_mrn='2055',
        baby_mrn='1215',
        milk_entry_uid='m000'
    ) == (True, f"Successfully deleted document {['2055', '1215', 'm000']}")

    assert delete_document(
        fs_client,
        mother_mrn='2247'
    ) == (True, f"Successfully deleted document {['2247']}")

    assert delete_document(
        fs_client,
        baby_mrn='3391'
    ) == (True, f"Successfully deleted document {['3391']}")

    assert delete_document(
        fs_client,
        milk_entry_uid='m001'
    ) == (True, f"Successfully deleted document {['m001']}")

    assert delete_document(
        fs_client,
        mother_mrn='2667',
        baby_mrn='3712',
    ) == (True, f"Successfully deleted document {['2667', '3712']}")

    assert delete_document(
        fs_client,
        mother_mrn='4487',
        milk_entry_uid='m004' # was '000002' before but caused issue since mother was already deleted - REMOVE THIS COMMENT LATER
    ) == (True, f"Successfully deleted document {['4487', 'm004']}") # was '000002' before but caused issue since mother was already deleted - REMOVE THIS COMMENT LATER

    assert delete_document(
        fs_client,
        baby_mrn='4697',
        milk_entry_uid='m003'
    ) == (True, f"Successfully deleted document {['4697', 'm003']}")

    # Test 2: No fields given
    assert delete_document(
        fs_client,
    ) == (False, "No MRN/UID given")

    # Test 3: mrn/uid doesn't exist
    assert delete_document(
        fs_client,
        mother_mrn='2055',
        baby_mrn='1215',
        milk_entry_uid='m000'
    ) == (False, f"MRN/UID {'2055'} does not exist in collection {'mothers'}")

    assert delete_document(
        fs_client,
        baby_mrn='1215',
        milk_entry_uid='m000'
    ) == (False, f"MRN/UID {'1215'} does not exist in collection {'babies'}")

    assert delete_document(
        fs_client,
        milk_entry_uid='m000'
    ) == (False, f"MRN/UID {'m000'} does not exist in collection {'milk_entries'}")
    