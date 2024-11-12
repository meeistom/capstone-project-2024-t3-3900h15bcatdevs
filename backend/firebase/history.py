from firebase.error_check import *
from firebase_admin import firestore
from firebase.retrieve import get_mother_name, get_full_name

# event_object = {
#     "type": str,
#     "message": str,
#     "details": dict,
#     "timestamp": int
# }


def log_event(firestore_client, event_type: str, data: dict) -> bool:
    """
    Formats and logs event of the following types to the database:
    - Milk Added
    - Milk Expiration
    - Milk Deleted
    - Baby Registered
    - Verification

    Args:
        firestore_client: Firestore client
        data: Json data containing data to be logged

    Returns:
        True if successful, False otherwise
    """
    if event_type not in event_types:
        print("(HISTORY) Invalid event type received")
        return False

    # Get mother name
    if event_type == "Milk Expiration":
        mother_name = get_mother_name(
            firestore_client, baby_mrn=data["baby_mrn"])
    elif event_type in ["Milk Added", "Milk Deleted", "Baby Registered"]:
        mother_name = data["mother_name"]

    # Baby name
    if event_type == "Baby Registered":
        baby_name = f"{data['first_name']} {data['last_name']}"
    elif event_type == "Milk Expiration":
        _, baby_name = get_full_name(firestore_client, mrn=data["baby_mrn"])
    elif event_type in ["Milk Added", "Milk Deleted"]:
        baby_name = data["baby_name"]

    # Build message
    if event_type == "Verification":
        if "error" in data:
            message = data["error"]
        elif not data["match"]:
            message = "FAIL - Mismatched Milk UID & Baby MRN scans"
        elif data["expired"]:
            message = "FAIL - Milk Expired"  # Milk and baby match
        else:
            message = "SUCCESS - Milk & Baby Match"
    elif event_type in ["Milk Added", "Milk Deleted"]:
        message = f"Milk from Mother {mother_name} for Baby {baby_name} {'added to' if event_type == 'Milk Added' else 'deleted from '} MilkGuard"
    elif event_type == "Milk Expiration":
        message = f"Milk {data['uid']} from Mother {mother_name} for Baby {baby_name} expired"
    elif event_type == "Baby Registered":
        message = f"Baby {baby_name} of Mother {mother_name} registered"

    # Build event data
    event_data = {
        "type": event_type,
        "message": message,
        "details": data,
        "timestamp": int(datetime.now().timestamp()),
    }

    return log_event_to_firebase(firestore_client, event_data=event_data)


def log_event_to_firebase(firestore_client, event_data: dict) -> bool:
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
