from ..search import *

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate(".key/key2.json")
    fba.initialize_app(cred)

fs_client = firestore.client()

def test_search_by_keyword():
    # Test 1: Valid parameter values
    result = search_by_keyword(
        fs_client,
        'mothers',
        'lynelle'
    )
    assert type(result) == list
    assert len(result) == 1

    result = search_by_keyword(
        fs_client,
        'babies',
        '5049'
    )
    assert type(result) == list
    assert len(result) == 1

    result = search_by_keyword(
        fs_client,
        'milk_entries',
        'Room 3'
    )
    assert type(result) == list
    assert len(result) == 4

    # Test 2: Blank keyword
    result = search_by_keyword(
        fs_client,
        'mothers',
        ''
    )
    assert type(result) == list
    assert len(result) == 0

    # Test 3: Keyword doesn't exist
    result = search_by_keyword(
        fs_client,
        'mothers',
        'hskajlhfdlkjahs'
    )
    assert type(result) == list
    assert len(result) == 0