from firebase.error_check import *
from typing import Tuple
from datetime import datetime

def edit_entry(firestore_client, collection_name: str, mrn_uid: str, new_data: dict) -> Tuple[bool, str]:
    """
    Edit an entry in the Firestore database.
    - milk_entries
    - babies
    - mothers

    Args:
        firestore_client (firestore.client.Client): The Firestore client.
        collection_name (str): The name of the collection.
        mrn_uid (str): The MRN/UID of the entry to edit.
        new_data (dict): The new data to update the entry with.

    Returns:
        Tuple[bool, str]: A tuple containing a boolean indicating success and a message.
    """
    # Check if the collection name is valid
    if collection_name not in data_collection_names:
        return False, "(EDIT) Invalid collection name"

    # Check if the entry exists in collection
    if not exists_in_collection(firestore_client, collection_name=collection_name, mrn_uid=mrn_uid):
        return False, "(EDIT) MRN/UID does not exist"
    
    # Check if the new data is valid
    if not has_valid_request_data_fields(object_name=collection_name, request_data=new_data):
        return False, "(EDIT) Invalid request data fields"
        
    # If the thing being changed is a milk entry, further checks required
    if collection_name == "milk_entries":
        # Enforce that baby mrn cannot be changed 
        del new_data['baby_mrn']

        # Expiration date must not be before current time mainly enforced by frontend
        if datetime.fromtimestamp(new_data['expiration_time']) < datetime.now():
            return False, "(EDIT) Expiration time cannot be before current time"

    try:
        # Update the document
        document = firestore_client.collection(collection_name).document(mrn_uid)
        document.update(new_data)
    except Exception as e:
        return False, f"(EDIT) Error updating document: {e}"

    return True, "(EDIT) Document updated successfully"


