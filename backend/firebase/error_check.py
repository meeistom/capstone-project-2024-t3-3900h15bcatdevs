from typing import Tuple
from datetime import datetime

collection_names = ["mothers", "babies", "milk_entries", "history"]

# Data fields in database when mothers, babies and milk_entries are added
mother_data_fields = ["first_name", "last_name", "mrn", "babies", "milks"]
baby_data_fields = ["first_name", "last_name", "mrn", "mother_mrn"]
milk_entry_data_fields = [
    "baby_mrn",
    "created_at",
    "expiration_time",
    "express_time",
    "extra_notes",
    "milk_type",
    "mother_mrn",
    "storage_location",
    "storage_type",
    "uid",
    "volume_ml",
    "expired"
]

event_object_fields = ["type", "message", "details", "timestamp"]
event_types = ["Verification", "Baby Registered", "Milk Expiration", "Milk Added"]

# Data fields expected when request data is sent to server to add new entry into database
add_mother_request_data = ["first_name", "last_name", "mrn"]
add_baby_request_data = ["first_name", "last_name", "mrn", "mother_mrn"]
add_milk_entry_request_data = [
    "milk_type",
    "express_time",
    "expiration_time",
    "storage_type",
    "storage_location",
    "volume_ml",
    "baby_mrn",
    "extra_notes",
]


def has_valid_request_data_fields(object_name: str, request_data: dict) -> bool:
    """
    Used to determine whether the request data has the correct fields to be added to the database
    """
    if object_name == "mothers":
        return all(field in request_data for field in add_mother_request_data)
    elif object_name == "babies":
        return all(field in request_data for field in add_baby_request_data)
    elif object_name == "milk_entries":
        return all(field in request_data for field in add_milk_entry_request_data)
    else:
        return False


# Checks if a MRN or UID exists in a specified collection
def exists_in_collection(firestore_client, collection_name: str, mrn_uid: str) -> bool:
    """
    Checks if a MRN or UID exists in the database
    """
    if collection_name not in collection_names:
        print("Collection name is not valid")
        return False

    collection = firestore_client.collection(collection_name)
    return False if len(mrn_uid) == 0 else collection.document(mrn_uid).get().exists


# Checks if a MRN or UID exists in the database, returns bool and the collection name
def exists_in_db(firestore_client, mrn_uid: str) -> Tuple[bool, str]:
    """
    Checks if a MRN or UID exists in the database.
    Returns bool and the collection name if found
    """
    for collection_name in collection_names:
        if exists_in_collection(firestore_client, collection_name, mrn_uid):
            return True, collection_name
    return False, None

def is_milk_expired(firestore_client, milk_uid: str) -> Tuple[bool, str]:
    """
    Checks if a milk entry is expired. Assumes a valid milk uid is passed
    Returns a tuple of a bool and the formatted expiry time
    """

    milk_document = firestore_client.collection("milk_entries").document(milk_uid)
    milk_expiry_time = datetime.fromtimestamp(
        milk_document.get().to_dict()["expiration_time"]
    )

    # Frontend niceties
    formatted_expiry_time = milk_expiry_time.strftime("%I:%S%p, on %a %d of %b %Y")

    # Check again if periodic handler hasn't caught it yet
    return datetime.now() > milk_expiry_time, formatted_expiry_time

def is_valid_event_data(event_data: dict) -> bool:
    """
    Checks if an event data is valid
    """
    # Checks that all fields are present
    if not all(key in event_data for key in event_object_fields):
        return False

    # Checks that type, message fields are strings
    if not all(isinstance(event_data[key], str) for key in ["type", "message"]):
        return False

    # Check that details is a dict
    if not isinstance(event_data["details"], dict):
        return False

    # Check that timestamp is an int
    if not isinstance(event_data["timestamp"], int):
        return False

    # Check that type is a valid event type
    if event_data["type"] not in event_types:
        return False

    return True
