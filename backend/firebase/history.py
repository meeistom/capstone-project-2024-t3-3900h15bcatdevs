from firebase.error_check import *
from firebase_admin import firestore
from firebase.retrieve import get_mother_name

# event_object = {
#     "type": str,
#     "message": str,
#     "details": dict,
#     "timestamp": int
# }


def log_milk_added_event(firestore_client, data: dict) -> bool:
    """
    Formats and logs an event to the database: Milk Added.

    Just addeds

    Args:
        firestore_client: Firestore client
        data: Json data containing data to be logged

    Returns:
        True if successful, False otherwise
    """
    mother_name = data["mother_name"]
    milk_added_event_data = {
        "type": "Milk Added",
        "message": f"Milk from Mother {mother_name} for Baby {data['baby_name']} added to MilkGuard",
        "details": data,
        "timestamp": int(datetime.now().timestamp()),
    }

    return log_event(firestore_client, milk_added_event_data)


def log_milk_expiration_event(firestore_client, data: dict) -> Tuple[bool, str]:
    """
    Formats and logs an event to the database: Milk Expiration.

    Args:
        firestore_client: Firestore client
        data: Json data containing data to be logged

    Returns:
        True if successful, False otherwise
    """
    mother_name = get_mother_name(firestore_client, data["baby_mrn"])
    baby_document = (
        firestore_client.collection("babies").document(data["baby_mrn"]).get().to_dict()
    )
    baby_name = baby_document["first_name"] + " " + baby_document["last_name"]
    milk_expiration_event_data = {
        "type": "Milk Expiration",
        "message": f"Milk {data['uid']} from Mother {mother_name} for Baby {baby_name} expired.",
        "details": data,
        "timestamp": int(datetime.now().timestamp()),
    }
    return log_event(firestore_client, milk_expiration_event_data)


def log_verification_event(firestore_client, data: dict) -> bool:
    """
    Formats and logs an event to the database: Verification.

    Args:
        firestore_client: Firestore client
        data: Json data containing data to be logged

    Returns:
        True if successful, False otherwise
    """
    if "error" in data:
        message = data["error"]
    elif not data["match"]:
        message = "FAIL - Mismatched Milk UID & Baby MRN scans"
    elif data["expired"]:
        message = "FAIL - Milk Expired"  # Milk and baby match
    else:
        message = "SUCCESS - Milk & Baby Match"

    verification_event_data = {
        "type": "Verification",
        "message": message,
        "details": data,
        "timestamp": int(datetime.now().timestamp()),
    }

    return log_event(firestore_client, verification_event_data)


def log_baby_registered_event(firestore_client, data: dict) -> bool:
    """
    Formats and logs an event to the database: Baby Registered.

    Args:
        firestore_client: Firestore client
        data: Json data containing data to be logged

    Returns:
        True if successful, False otherwise
    """
    baby_name = f"{data['first_name']} {data['last_name']}"
    mother_name = data["mother_name"]
    message = f"Baby {baby_name} ({data['mrn']}) of Mother {mother_name} registered"

    baby_added_event_data = {
        "type": "Baby Registered",
        "message": message,
        "details": data,
        "timestamp": int(datetime.now().timestamp()),
    }

    return log_event(firestore_client, baby_added_event_data)


def log_event(firestore_client, event_data: dict) -> bool:
    """
    Generic adds event object to history database collection

    Args:
        firestore_client (_type_): _description_
        event_data (dict): _description_

    Returns:
        bool: Success or not
    """
    # Event data check
    if not is_valid_event_data(event_data):
        print("(HISTORY) Invalid event data")
        return False

    try:
        # Get event id
        stats_collection = firestore_client.collection("stats")
        event_id_tracker_document = (
            stats_collection.document("counters").get().to_dict()
        )
        event_id_tracker = event_id_tracker_document[
            "event_counter"
        ]  # Currently the largest UID in use
        new_event_id = int(event_id_tracker)
        new_event_id = str(new_event_id).zfill(6)

        # Add event to history collection
        history_collection = firestore_client.collection("history")
        history_collection.document(new_event_id).set(event_data)
        
        # Increment counter on database
        stats_collection.document("counters").update(
            {"event_counter": firestore.Increment(1)}
        )

        return True
    except Exception as e:
        print(f"(HISTORY) An error occurred while adding data: {e}")
        return False
