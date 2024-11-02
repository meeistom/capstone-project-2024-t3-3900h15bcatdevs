from firebase.error_check import *


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

    Args:
        firestore_client (Firestore Client): Firestore Client object.
        field (str): Field to search in baby objects.
        search_value (str): Value to search for in the field.

    Returns:
        list: Baby objects with the name matching string or all babies if no selection.
    """
    # Should always be true
    if field:
        assert is_valid_data_field("babies", field)

    baby_collection_stream = firestore_client.collection("babies").stream()

    babies_list = []
    for baby_doc in baby_collection_stream:
        match field:
            # Exact mrn match
            case "mrn":
                if baby_doc.to_dict()[field] != search_value:
                    continue
            # Lowered case first/last name match
            case "first_name" | "last_name":
                if baby_doc.to_dict()[field].lower() != search_value.lower():
                    continue

        babies_list.append(baby_doc.to_dict())

    return babies_list


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
