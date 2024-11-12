from firebase.error_check import *
from typing import Tuple

def edit_entry(firestore_client, collection_name: str, mrn_uid: str, new_data: dict) -> Tuple[bool, str]:
    """
    Edit an entry in the Firestore database.
    - milk_entries
    - babies
    - mothers
    """
    # Check if the collection name is valid
    if collection_name not in collection_names:
        return False, "(EDIT) Invalid collection name"

    # Check if the entry exists in collection
    if not exists_in_collection(firestore_client, collection_name=collection_name, mrn_uid=mrn_uid):
        return False, "(EDIT) MRN/UID does not exist"
    
    # Check if the new data is valid
    if collection_name == "milk_entries":
        if not is_valid_milk_entry_data(milk_entry_data=new_data):
            return False, "(EDIT) Invalid request milk data fields"
    elif collection_name == "babies":
        if not is_valid_baby_data(baby_data=new_data):
            return False, "(EDIT) Invalid request baby data fields"
    elif collection_name == "mothers":
        if not is_valid_mother_data(mother_data=new_data):
            return False, "(EDIT) Invalid request mother data fields"
        
    try:
        # Update the document
        document = firestore_client.collection(collection_name).document(mrn_uid)
        document.update(new_data)
        return True, "(EDIT) Document updated successfully"
    except Exception as e:
        return False, f"(EDIT) Error updating document: {e}"



