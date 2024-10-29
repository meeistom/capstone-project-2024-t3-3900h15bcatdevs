from typing import Tuple
from datetime import datetime

collection_names = ['mothers', 'babies', 'milk_entries']

# Checks if a MRN or UID exists in a specified collection
def exists_in_collection(firestore_client, collection_name: str, mrn_uid: str) -> bool:
    """
    Checks if a MRN or UID exists in the database
    """
    if collection_name not in collection_names:
        print("Collection name is not valid")
        return False
    
    collection = firestore_client.collection(collection_name)
    return False if len(mrn_uid) == 0 else collection.document(mrn_uid).get().exists

# Checks if a MRN or UID exists in the database, returns bool and the collection name
def exists_in_db(firestore_client, mrn_uid: str) -> Tuple[bool, str]:
    """
    Checks if a MRN or UID exists in the database. 
    Returns bool and the collection name if found
    """
    for collection_name in collection_names:
        if exists_in_collection(firestore_client, collection_name, mrn_uid):
            return True, collection_name
    return False, None

def is_valid_mother_data(mother_data: dict) -> bool:
    """
    Checks if a mother data is valid
    """
    return all(key in mother_data for key in ["mrn", "first_name", "last_name"])


def is_valid_baby_data(baby_data: dict) -> bool:
    """
    Checks if a baby data is valid
    """
    return all(
        key in baby_data for key in ["mrn", "first_name", "last_name", "mother_mrn"]
    )


def is_valid_milk_entry_data(milk_entry_data: dict) -> bool:
    """
    Checks if a milk entry data is valid
    """
    return all(key in milk_entry_data for key in ["milk_type", 
                                                  "express_time", 
                                                  "expiration_time",
                                                  "storage_type",
                                                  "storage_location",
                                                  "volume_ml",
                                                  "owner_mrn", 
                                                  "extra_notes",
                                                  "created_at"])

def is_milk_expired(firestore_client, milk_uid: str) -> Tuple[bool, int]:
    """
    Checks if a milk entry is expired
    Assumes a valid milk uid is passed
    Returns a tuple of a bool and the expiry time
    """
    milk_document = firestore_client.collection("milk_entries").document(milk_uid)
    milk_expiry_time = datetime.fromtimestamp(milk_document.get().to_dict()["expiration_time"])
    return milk_expiry_time < datetime.now(), milk_expiry_time
