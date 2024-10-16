from firebase.retrieve import is_valid_mother, is_valid_baby, is_valid_milk_entry
from typing import Tuple

def delete_mother(firestore_client, mother_mrn: str) -> Tuple[bool, str]:
    """
    Deletes a mother from the database
    """
    if not is_valid_mother(firestore_client, mother_mrn):
        return False, "Mother does not exist"

    try:
        mother_collection = firestore_client.collection("mothers")
        mother_collection.document(mother_mrn).delete()
    except Exception as e:
        print(f"DELETE MOTHER: An error occurred while deleting data: {e}")

    return True, "Successfully deleted mother"

def delete_baby(firestore_client, baby_mrn: str) -> Tuple[bool, str]:
    """
    Deletes a baby from the database
    """
    if not is_valid_baby(firestore_client, baby_mrn):
        return False, "Baby does not exist"

    try:
        baby_collection = firestore_client.collection("babies")
        baby_collection.document(baby_mrn).delete()
    except Exception as e:
        print(f"DELETE BABY: An error occurred while deleting data: {e}")
    
    return True, "Successfully deleted baby"

def delete_milk_entry(firestore_client, milk_entry_uid: str) -> Tuple[bool, str]:
    """
    Deletes a milk entry from the database
    """
    if not is_valid_milk_entry(firestore_client, milk_entry_uid):
        return False, "Milk entry does not exist"

    try:
        milk_collection = firestore_client.collection("milk_entries")
        milk_collection.document(milk_entry_uid).delete()
    except Exception as e:
        print(f"DELETE MILK ENTRY: An error occurred while deleting data: {e}")

    return True, "Successfully deleted milk entry"