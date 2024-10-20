from firebase.error_check import *
from typing import Tuple

def add_mother(firestore_client, mother_json_data: dict) -> Tuple[bool, str]:
    """
    Adds a mother to the database
    """
    # Check if mother data is valid
    if not is_valid_mother_data(mother_json_data):
        return False, "Invalid mother data"

    # Check if mrn in use
    if mother_exists(firestore_client, mother_json_data['mrn']):
        return False, "Mother already exists"

    try:         
        mother_collection = firestore_client.collection("mothers") # Check if collection exists?
        mother_collection.document(mother_json_data['mrn']).set({
            'mrn': mother_json_data['mrn'],
            'first_name': mother_json_data['first_name'],
            'last_name': mother_json_data['last_name'],
            'babies': [],
            'milks': []
        })
    except Exception as e:
        print(f"An error occurred while loading data: {e}")

    return True, "Successfully added mother"

def add_baby(firestore_client, baby_json_data: dict) -> Tuple[bool, str]:
    """
    Adds a baby to the database
    """
    # Check if baby data is valid
    if not is_valid_baby_data(baby_json_data):
        return False, "Invalid baby data"

    # Check if mother mrn exists
    if not mother_exists(firestore_client, baby_json_data['mother_mrn']) and baby_json_data['mother_mrn'] != "None":
        return False, "Mother does not exist"

    # Check if mrn in use
    if baby_exists(firestore_client, baby_json_data['mrn']):
        return False, "Baby already exists"
    
    try:
        baby_collection = firestore_client.collection("babies")
        baby_collection.document(baby_json_data['mrn']).set({
            'mrn': baby_json_data['mrn'],
            'first_name': baby_json_data['first_name'],
            'last_name': baby_json_data['last_name'],
            'mother_mrn': baby_json_data['mother_mrn'],
        })
        # Also add baby mrn to mother's babies list
    except Exception as e:
        print(f"An error occurred while loading data: {e}")

    return True, "Successfully added baby"

def add_milk_entry(firestore_client, milk_entry_json_data: dict) -> Tuple[bool, str]:
    """
    Adds a milk entry to the database
    """
    # Check  if milk entry data is valid
    if not is_valid_milk_entry_data(milk_entry_json_data):
        return False, "Invalid milk entry data"

    # Check if baby uid exists
    if not baby_exists(firestore_client, milk_entry_json_data['owner_mrn']) and not mother_exists(firestore_client, milk_entry_json_data['owner_mrn']):
        return False, "Owner Baby or Mother does not exist"

    # Check if uid in use
    if milk_entry_exists(firestore_client, milk_entry_json_data['uid']):
        return False, "Milk entry already exists"

    try:
        milk_collection = firestore_client.collection("milk_entries")
        milk_collection.document(milk_entry_json_data['uid']).set({
            'uid': milk_entry_json_data['uid'],
            'milk_type': milk_entry_json_data['milk_type'],
            'express_time': milk_entry_json_data['express_time'],
            'expiration_date': milk_entry_json_data['expiration_date'],
            'storage_type': milk_entry_json_data['storage_type'],
            'storage_location': milk_entry_json_data['storage_location'],
            'volume_ml': milk_entry_json_data['volume_ml'],
            'owner_mrn': milk_entry_json_data['owner_mrn'],
            'extra_notes': milk_entry_json_data['extra_notes']
        })
    except Exception as e:
        print(f"ADD MILK ENTRY: An error occurred while loading data: {e}")

    return True, "Successfully added milk entry"