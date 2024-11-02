from firebase.error_check import *
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter


def retrieve_mothers(
    firestore_client, field: str = None, search_value: str = None
) -> list:
    """
    Gets a mother from the database by first name, or last name or get all if no selection.

    Args:
        firestore_client (Firestore Client): Firestore Client object.
        field (str): Field to search in mother objects.
        search_value (str): Value to search for in the field.

    Returns:
        list: Mother objects with the name matching string or all mothers if no selection.
    """
    # Should always be true
    if field:
        assert is_valid_data_field("mothers", field)

    mother_collection_stream = firestore_client.collection("mothers").stream()

    mothers_list = []
    for mother_doc in mother_collection_stream:
        match field:
            case "mrn":
                if mother_doc.to_dict()[field] != search_value:
                    continue
            case "first_name" | "last_name":
                if mother_doc.to_dict()[field].lower() != search_value.lower():
                    continue

        mothers_list.append(mother_doc.to_dict())

    return mothers_list


def retrieve_babies(
    firestore_client, field: str = None, search_value: str = None
) -> list:
    """
    Gets a baby from the database by first name, or last name or get all if no selection.
    """
    # Should always be true
    if field:
        assert is_valid_data_field("babies", field)

    baby_collection_stream = firestore_client.collection("babies").stream()

    babies_list = []
    for baby_doc in baby_collection_stream:
        match field:
            case "mrn":
                if baby_doc.to_dict()[field] != search_value:
                    continue
            case "first_name" | "last_name":
                if baby_doc.to_dict()[field].lower() != search_value.lower():
                    continue

        babies_list.append(baby_doc.to_dict())

    return babies_list


def retrieve_milk_entry_by_uid(firestore_client, uid: str) -> dict:
    """
    Gets a milk entry from the database
    """
    if not exists_in_collection(firestore_client, "milk_entries", uid):
        # print("GET MILK ENTRY: Milk entry does not exist")
        return {}
    else:
        milk_collection = firestore_client.collection("milk_entries")
    try:
        return milk_collection.document(uid).get().to_dict()
    except Exception as e:
        print(f"GET MILK ENTRY: An error occurred while getting data: {e}")


def retrieve_all_milk_entries(firestore_client, order_direction: str = "DESC"):
    milk_entries_collection = firestore_client.collection("milk_entries")

    direction = (
        firestore.Query.ASCENDING
        if order_direction.upper() == "ASC"
        else firestore.Query.DESCENDING
    )

    query = milk_entries_collection.order_by("created_at", direction=direction)
    results = query.stream()

    entries = []

    for doc in results:
        entries.append(doc.to_dict())

    return entries


def retrieve_by_keyword(firestore_client, keyword: str) -> dict:
    """
    Gets any matches from the database by a keyword.
    """
    collections = ["mothers", "babies", "milk_entries"]
    results = {}
    keyword_lower = keyword.lower()  # for case-insensitive search

    for collection_name in collections:
        collection = firestore_client.collection(collection_name)

        try:
            query = collection.stream()
            results[collection_name] = [
                doc_dict
                for doc in query
                if keyword_lower in str(doc_dict := doc.to_dict()).lower()
            ]

            if not results[collection_name]:
                print(
                    f"GET {collection_name.upper()}: No matches found for keyword='{keyword}' in {collection_name}"
                )

        except Exception as e:
            print(
                f"GET {collection_name.upper()}: An error occurred while querying data: {e}"
            )
            results[collection_name] = []

    return results
