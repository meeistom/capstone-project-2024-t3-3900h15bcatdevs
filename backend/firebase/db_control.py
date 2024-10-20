# USE TO CLEAR FIREBASE DB
# WARNING: DESTRUCTIVE STUFF

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