from firebase.error_check import *
from typing import Tuple


def retrieve_from_collection(
    firestore_client, collection: str, mrn_uid: str = None, order: str = "DESC"
) -> list:
    """
    Retrieves all documents from a collection. If MRN/UID provided then returns appropriate document.

    Args:
        firestore_client (Firestore Client): Firestore Client object.
        collection (str): Collection to retrieve from.
        mrn (str, optional): MRN of mother/baby. Defaults to None.
        order (str, optional): Order to return the results in. Defaults to "DESC".

    Returns:
        list: List of mother objects.
    """
    assert collection in collection_names

    collection_stream = firestore_client.collection(collection).stream()

    return_list = []

    if mrn_uid:
        # Check if document exists
        if not exists_in_collection(firestore_client, collection, mrn_uid):
            return []

        doc = firestore_client.collection(collection).document(mrn_uid).get()
        return_list.append(doc.to_dict())
    else:
        for doc in collection_stream:
            return_list.append(doc.to_dict())

    # If milk, entries, sorts for returning most recently created first
    if collection == "milk_entries":
        return_list.sort(key=lambda x: x["created_at"], reverse=(order == "DESC"))

    return return_list


def retrieve_milk_entries(
    firestore_client, field: str = None, search_value: str = None, order: str = "DESC"
) -> list:
    """
    Gets milk entries from the database by field specified matches, otherwise returns all in descending order from creation

    Args:
        firestore_client (Firestore Client): Firestore Client object.
        field (str): Field to search in milk entry objects.
        search_value (str): Value to search for in the field.
        order (str): Order to return the results in.

    Returns:
        list: Milk entries with the specified uid or all milk entries if no selection.
    """
    if field:
        assert is_valid_data_field("milk_entries", field)

    milk_entries_collection = firestore_client.collection("milk_entries").stream()

    milk_entries_list = []
    for milk_doc in milk_entries_collection:
        if field == "uid" and milk_doc.id != search_value:
            continue

        milk_entries_list.append(milk_doc.to_dict())

    # Sorts for returning most recently created first
    milk_entries_list.sort(key=lambda x: x["created_at"], reverse=(order == "DESC"))

    return milk_entries_list
