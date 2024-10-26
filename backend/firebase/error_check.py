from typing import Tuple
from datetime import datetime

collection_names = ['mothers', 'babies', 'milk_entries']

def mother_exists(firestore_client, mrn: str) -> bool:
    """
    Checks if a mother exists in the database
    """
    mothers_collection = firestore_client.collection("mothers")
    return False if len(mrn) == 0 else mothers_collection.document(mrn).get().exists

def baby_exists(firestore_client, mrn: str) -> bool:
    """
    Checks if a baby exists in the database
    """
    babies_collection = firestore_client.collection("babies")
    return False if len(mrn) == 0 else babies_collection.document(mrn).get().exists

def milk_entry_exists(firestore_client, uid: str) -> bool:
    """
    Checks if a milk entry exists in the database
    """
    milk_entries_collection = firestore_client.collection("milk_entries")
    return False if len(uid) == 0 else milk_entries_collection.document(uid).get().exists

def exists_in_collection(firestore_client, collection_name: str, mrn_uid: str) -> bool:
    """
    Checks if a MRN or UID exists in the database
    """
    if collection_name not in collection_names:
        print("Collection name is not valid")
        return False
    
    collection = firestore_client.collection(collection_name)
    return collection.document(mrn_uid).get().exists

# Checks if a MRN or UID exists in the database, returns bool and the collection name
def exists_in_db(firestore_client, mrn_uid: str) -> Tuple[bool, str]:
    """
    Checks if a MRN or UID exists in the database
    """
    if exists_in_collection(firestore_client, "mothers", mrn_uid):
        return True, "mothers"
    elif exists_in_collection(firestore_client, "babies", mrn_uid):
        return True, "babies"
    elif exists_in_collection(firestore_client, "milk_entries", mrn_uid):
        return True, "milk_entries"
    else:
        return False, "MRN/UID not found in database"

def is_valid_mother_data(mother_data: dict) -> bool:
    """
    Checks if a mother data is valid
    """
    return all(key in mother_data for key in ["mrn", 
                                              "first_name", 
                                              "last_name"])

def is_valid_baby_data(baby_data: dict) -> bool:
    """
    Checks if a baby data is valid
    """
    return all(key in baby_data for key in ["mrn", 
                                            "first_name", 
                                            "last_name", 
                                            "mother_mrn"])

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
                                                  "extra_notes"])

def milk_is_expired(firestore_client, milk_uid: str) -> Tuple[bool, str]:
    """
    Checks if a milk entry is expired
    Assumes a valid milk uid is passed
    """
    milk_document = firestore_client.collection("milk_entries").document(milk_uid)
    # milk_expiry_time = datetime.strptime(milk_document.get().to_dict()["expiration_date"], "%Y-%m-%d")
    milk_expiry_time = "soemthing"
    return milk_expiry_time < datetime.now(), milk_expiry_time