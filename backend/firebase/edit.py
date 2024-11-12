from firebase.error_check import *
from typing import Tuple
from datetime import datetime


def edit_entry(firestore_client, mrn_uid: str, new_data: dict, collection_name: str = "milk_entries", ) -> Tuple[bool, str]:
    """
    Edit an entry in the Firestore database. Only supports:
    - milk_entries 

    Args:
        firestore_client (firestore.client.Client): The Firestore client.
        collection_name (str): The name of the collection. Default.
        mrn_uid (str): The MRN/UID of the entry to edit.
        new_data (dict): The new data to update the entry with.

    Returns:
        Tuple[bool, str]: A tuple containing a boolean indicating success and a message.
    """
    # Check if the collection name is supported
    if collection_name != "milk_entries":
        return False, "(EDIT) Only editing milk entries is supported"

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
        document = firestore_client.collection(
            collection_name).document(mrn_uid)
        document.update(new_data)
    except Exception as e:
        return False, f"(EDIT) Error updating document: {e}"

    return True, "(EDIT) Document updated successfully"
