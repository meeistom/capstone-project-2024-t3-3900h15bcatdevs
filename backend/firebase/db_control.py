# USE TO ADD & CLEAR FIREBASE DB
# WARNING: DESTRUCTIVE STUFF

import json
import firebase_admin as fba
from firebase_admin import firestore, credentials

collection_names = ['mothers', 'babies', 'milk_entries']

# cred = credentials.Certificate('./firebase/key_gabe.json')
# cred = credentials.Certificate('./firebase/key_cynthia.json')
cred = credentials.Certificate('../firebase/key_aolin.json')
# cred = credentials.Certificate('./firebase/key_parker.json')
# cred = credentials.Certificate('./firebase/key_tom.json')
# cred = credentials.Certificate('./firebase/key_parker.json')

fba.initialize_app(cred)
fs_client = firestore.client()

def clear_collection(firestore_client, collection_name: str):
    assert(collection_name in collection_names)

    collection_ref = firestore_client.collection(collection_name)
    documents = collection_ref.list_documents()
    for document in documents:
        document.delete()

def add_dummy_data(firestore_client, collection_name: str, json_path: str):
    assert(collection_name in collection_names)
    
    collection_ref = firestore_client.collection(collection_name)
    with open(json_path) as json_file:
        data = json.load(json_file)
        for entry in data:
            key = 'uid' if collection_name == 'milk_entries' else 'mrn'
            collection_ref.document(entry[key]).set(entry)

# if __name__ == '__main__':
#     clear_collection(fs_client, "mothers")
#     print("cleared");
#     clear_collection(fs_client, "babies")
#     clear_collection(fs_client, "milk_entries")

#     add_dummy_data(fs_client, "mothers", "../firebase/data/mother_details.json")
#     add_dummy_data(fs_client, "babies", "../firebase/data/baby_details.json")
#     add_dummy_data(fs_client, "milk_entries", "../firebase/data/bottle_details.json")