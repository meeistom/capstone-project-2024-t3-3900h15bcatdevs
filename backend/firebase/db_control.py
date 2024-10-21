# USE TO ADD & CLEAR FIREBASE DB
# WARNING: DESTRUCTIVE STUFF

import json
import firebase_admin as fba
from firebase_admin import firestore, credentials

cred = credentials.Certificate('./firebase/key_gabe.json')
# cred = credentials.Certificate('./firebase/key_cynthia.json')
# cred = credentials.Certificate('./firebase/key_aolin.json')
# cred = credentials.Certificate('./firebase/key_parker.json')
# cred = credentials.Certificate('./firebase/key_tom.json')
# cred = credentials.Certificate('./firebase/key_parker.json')

fba.initialize_app(cred)
fs_client = firestore.client()

def clear_mothers(firestore_client):
    # Delete all documents in the "mothers" collectio
    mothers_ref = firestore_client.collection("mothers")
    mothers = mothers_ref.list_documents()
    for mother in mothers:
        mother.delete()

def clear_babies(firestore_client):
    # Delete all documents in the "babies" collection
    babies_ref = firestore_client.collection("babies")
    babies = babies_ref.list_documents()
    for baby in babies:
        baby.delete()

def clear_milk_entries(firestore_client):
    # Delete all documents in the "milk_entries" collection
    milk_entries_ref = firestore_client.collection("milk_entries")
    milk_entries = milk_entries_ref.list_documents()
    for milk_entry in milk_entries:
        milk_entry.delete()

def clear_all_collections(firestore_client):
    clear_mothers(firestore_client)
    clear_babies(firestore_client)
    clear_milk_entries(firestore_client)

def add_dummy_mothers(firestore_client):
    # Add all mothers
    mothers_ref = firestore_client.collection("mothers")
    with open('./firebase/data/mother_details.json') as json_file:
        data = json.load(json_file)
        for mother in data:
            mothers_ref.document(mother['mrn']).set(mother)

def add_dummy_babies(firestore_client):
    # Add all babies
    babies_ref = firestore_client.collection("babies")
    with open('./firebase/data/baby_details.json') as json_file:
        data = json.load(json_file)
        for baby in data:
            babies_ref.document(baby['mrn']).set(baby)

def add_dummy_milk_entries(firestore_client):
    # Add all milk entries
    milk_entries_ref = firestore_client.collection("milk_entries")
    with open('./firebase/data/bottle_details.json') as json_file:
        data = json.load(json_file)
        for milk_entry in data:
            milk_entries_ref.document(milk_entry['uid']).set(milk_entry)

def add_dummy_data(firestore_client):
    add_dummy_mothers(firestore_client)
    add_dummy_babies(firestore_client)
    add_dummy_milk_entries(firestore_client)

if __name__ == '__main__':
    # clear_all_collections(fs_client)
    # add_dummy_data(fs_client)
    pass