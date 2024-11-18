from ..delete import *

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate(".key/key2.json")
    fba.initialize_app(cred)

fs_client = firestore.client()

def test_delete_document():
    # Test 1: Correct fields
    assert delete_document(
        fs_client,
        mother_mrn='2247',
        baby_mrn='9959',
        milk_entry_uid='m000'
    ) == (True, f"Successfully deleted document {['2247', '9959', 'm000']}")

    assert delete_document(
        fs_client,
        mother_mrn='4487'
    ) == (True, f"Successfully deleted document {['4487']}")

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
        mother_mrn='8017',
        baby_mrn='7340',
    ) == (True, f"Successfully deleted document {['8017', '7340']}")

    assert delete_document(
        fs_client,
        mother_mrn='8220',
        milk_entry_uid='m002' # was '000002' before but caused issue since mother was already deleted - REMOVE THIS COMMENT LATER
    ) == (True, f"Successfully deleted document {['8220', 'm002']}") # was '000002' before but caused issue since mother was already deleted - REMOVE THIS COMMENT LATER

    assert delete_document(
        fs_client,
        baby_mrn='6127',
        milk_entry_uid='m003'
    ) == (True, f"Successfully deleted document {['6127', 'm003']}")

    # Test 2: No fields given
    assert delete_document(
        fs_client,
    ) == (False, "No MRN/UID given")

    # Test 3: mrn/uid doesn't exist
    assert delete_document(
        fs_client,
        mother_mrn='2247',
        baby_mrn='9959',
        milk_entry_uid='m000'
    ) == (False, f"MRN/UID {'2247'} does not exist in collection {'mothers'}")

    assert delete_document(
        fs_client,
        baby_mrn='9959',
        milk_entry_uid='m000'
    ) == (False, f"MRN/UID {'9959'} does not exist in collection {'babies'}")

    assert delete_document(
        fs_client,
        milk_entry_uid='m000'
    ) == (False, f"MRN/UID {'m000'} does not exist in collection {'milk_entries'}")
    