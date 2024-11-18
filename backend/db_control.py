# USE TO ADD & CLEAR FIREBASE DB
# WARNING: DESTRUCTIVE STUFF

# !!! Please run in firebase folder.

import json
import firebase_admin as fba
from firebase_admin import firestore, credentials

from firebase.error_check import *
from firebase.add import *

from datetime import datetime, timedelta

CONSECUTIVE_MILK_EXPIRY = False
CONSECUTIVE_MILK_EXPIRY_INTERVAL = timedelta(minutes=1)

cred = credentials.Certificate('./.key/key.json')

fba.initialize_app(cred)
fs_client = firestore.client()

def clear_collection(firestore_client, collection_name: str):
    assert(collection_name in all_collection_names)

    collection_ref = firestore_client.collection(collection_name)
    documents = collection_ref.list_documents()
    for document in documents:
        document.delete()

def add_dummy_data(firestore_client, collection_name: str, json_path: str):
    assert(collection_name in all_collection_names)
    
    with open(json_path) as json_file:
        data = json.load(json_file)
        time_stamp_offset = datetime.now()
        for entry in data:
            if collection_name == "milk_entries":
                # Adds milks that are specified minutes from expiring from the current time
                if CONSECUTIVE_MILK_EXPIRY:
                    time_stamp_offset = time_stamp_offset + CONSECUTIVE_MILK_EXPIRY_INTERVAL
                    entry["expiration_time"] = int(time_stamp_offset.timestamp())
                
                # Otherwise, expiry time is as specified in dummy
                success, message = add_milk_entry(firestore_client, milk_entry_json_data=entry)
            elif collection_name == "babies":
                success, message = add_baby(firestore_client, baby_json_data=entry)
            elif collection_name == "mothers":
                success, message = add_mother(firestore_client, mother_json_data=entry)
            else:
                continue

            if not success:
                print(message)

if __name__ == '__main__':
    fs_client.collection("stats").document("counters").update({"milk_uid_counter": 0})
    fs_client.collection("stats").document("counters").update({"event_counter": 0})

    clear_collection(fs_client, "mothers")
    clear_collection(fs_client, "babies")
    clear_collection(fs_client, "milk_entries")
    clear_collection(fs_client, "history")

    add_dummy_data(fs_client, "mothers", "./firebase/data/mother_details_raw.json")
    add_dummy_data(fs_client, "babies", "./firebase/data/baby_details_raw.json")
    add_dummy_data(fs_client, "milk_entries", "./firebase/data/milk_details_raw.json")
