from db_control import *

import firebase_admin as fba
from firebase_admin import firestore, credentials

if not fba._apps:
    cred = credentials.Certificate(".key/key2.json")
    fba.initialize_app(cred)

fs_client = firestore.client()

def test_clear_collection():
    fs_client.collection("stats").document("counters").update({"milk_uid_counter": 0})
    fs_client.collection("stats").document("counters").update({"event_counter": 0})

    clear_collection(fs_client, "mothers")
    clear_collection(fs_client, "babies")
    clear_collection(fs_client, "milk_entries")
    clear_collection(fs_client, "history")

def test_add_dummy_data():
    add_dummy_data(fs_client, "mothers", "./firebase/data/mother_details_raw.json")
    add_dummy_data(fs_client, "babies", "./firebase/data/baby_details_raw.json")
    add_dummy_data(fs_client, "milk_entries", "./firebase/data/milk_details_raw.json")