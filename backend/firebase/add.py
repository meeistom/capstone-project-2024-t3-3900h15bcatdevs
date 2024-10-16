from firebase.retrieve import is_valid_mother, is_valid_baby, is_valid_milk_entry
from typing import Tuple

def add_mother(firestore_client,
               mrn: str,
               first_name: str,
               last_name: str) -> Tuple[bool, str]:
    """
    Adds a mother to the database
    """
    # Check if mrn in use
    if is_valid_mother(firestore_client, mrn):
        return False, "Mother already exists"

    try:         
        mother_collection = firestore_client.collection("mothers") # Check if collection exists?
        mother_collection.document(mrn).set({
            'mrn': mrn,
            'first_name': first_name,
            'last_name': last_name,
            'babies': [],
            'milks': []
        })
    except Exception as e:
        print(f"An error occurred while loading data: {e}")

    return True, "Successfully added mother"

def add_baby(firestore_client,
             mrn: str, 
             first_name: str,
             last_name: str,
             mother_mrn: str) -> Tuple[bool, str]:
    """
    Adds a baby to the database
    """
    # Check if mother uid exists
    if not is_valid_mother(firestore_client, mother_mrn) and mother_mrn != "None":
        return False, "Mother does not exist"

    # Check if uid in use
    if is_valid_baby(firestore_client, mrn):
        return False, "Baby already exists"
    
    try:
        baby_collection = firestore_client.collection("babies")
        baby_collection.document(mrn).set({
            'mrn': mrn,
            'first_name': first_name,
            'last_name': last_name,
            'mother_mrn': mother_mrn,
        })
        # Also add baby mrn to mother's babies list
    except Exception as e:
        print(f"An error occurred while loading data: {e}")

    return True, "Successfully added baby"

def add_milk_entry(firestore_client,
                   uid: str,
                   milk_type: str,
                   express_time: str,
                   storage_type: str,
                   storage_location: str,
                   volume_ml: int,
                   owner_mrn: str,
                   extra_notes: str) -> Tuple[bool, str]:
    """
    Adds a milk entry to the database
    """
    # Check if baby uid exists
    if not is_valid_baby(firestore_client, owner_mrn) and not is_valid_mother(firestore_client, owner_mrn):
        return False, "Owner Baby or Mother does not exist"

    # Check if uid in use
    if is_valid_milk_entry(firestore_client, uid):
        return False, "Milk entry already exists"

    try:
        milk_collection = firestore_client.collection("milk_entries")
        milk_collection.document(uid).set({
            'uid': uid,
            'milk_type': milk_type,
            'express_time': express_time,
            'expiration_date': "NOT IMPLEMENTED YET",
            'storage_type': storage_type,
            'storage_location': storage_location,
            'volume_ml': volume_ml,
            'owner_mrn': owner_mrn,
            'extra_notes': extra_notes
        })
    except Exception as e:
        print(f"ADD MILK ENTRY: An error occurred while loading data: {e}")

    return True, "Successfully added milk entry"