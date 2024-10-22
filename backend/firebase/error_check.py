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
    return all(key in milk_entry_data for key in ["milk_type", 
                                                  "express_time", 
                                                  "expiration_time",
                                                  "storage_type",
                                                  "storage_location",
                                                  "volume_ml",
                                                  "owner_mrn", 
                                                  "extra_notes"])