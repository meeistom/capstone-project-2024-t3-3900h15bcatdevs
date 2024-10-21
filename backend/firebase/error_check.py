collection_names = ['mothers', 'babies', 'milk_entries']

def mother_exists(firestore_client, mrn: str) -> bool:
    """
    Checks if a mother exists in the database
    """
    mothers_collection = firestore_client.collection("mothers")
    return mothers_collection.document(mrn).get().exists

def baby_exists(firestore_client, mrn: str) -> bool:
    """
    Checks if a baby exists in the database
    """
    babies_collection = firestore_client.collection("babies")
    return babies_collection.document(mrn).get().exists

def milk_entry_exists(firestore_client, mrn: str) -> bool:
    """
    Checks if a milk entry exists in the database
    """
    milk_entries_collection = firestore_client.collection("milk_entries")
    return milk_entries_collection.document(mrn).get().exists

def exists_in_collection(firestore_client, collection_name: str, mrn_uid: str) -> bool:
    """
    Checks if a MRN or UID exists in the database
    """
    if collection_name not in collection_names:
        print("Collection name is not valid")
        return False
    
    collection = firestore_client.collection(collection_name)
    return collection.document(mrn_uid).get().exists

def exists_in_db(firestore_client, mrn_uid: str) -> bool:
    """
    Checks if a MRN or UID exists in the database
    """
    return exists_in_collection(firestore_client, "mothers", mrn_uid) or \
           exists_in_collection(firestore_client, "babies", mrn_uid) or \
           exists_in_collection(firestore_client, "milk_entries", mrn_uid)

def is_valid_mother_data(mother_data: dict) -> bool:
    """
    Checks if a mother data is valid
    """
    return all(key in mother_data for key in ["mrn", "first_name", "last_name"])

def is_valid_baby_data(baby_data: dict) -> bool:
    """
    Checks if a baby data is valid
    """
    return all(key in baby_data for key in ["mrn", "first_name", "last_name", "mother_mrn"])

def is_valid_milk_entry_data(milk_entry_data: dict) -> bool:
    """
    Checks if a milk entry data is valid
    """
    return all(key in milk_entry_data for key in ["uid",
                                                  "milk_type", 
                                                  "express_time", 
                                                  "expiration_date",
                                                  "storage_type",
                                                  "storage_location",
                                                  "volume_ml",
                                                  "owner_mrn", 
                                                  "extra_notes"])