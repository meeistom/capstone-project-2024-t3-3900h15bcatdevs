from firebase.error_check import *

event_types = ["verification", "baby_registered", "milk_expiration", "milk_added"]


def log_milk_expiration_event(firestore_client, type: str) -> Tuple[bool, str]:
    """
    Logs an event to the database

    add milk
    verification fail or success
    baby registered
    milk expiry

    {
    History Object
        "type": "verification" OR "baby_registered" OR "milk_expiration" OR "milk_added",
        "event_timestamp": timestamp,
        "message": "Verification failed",
    }

    """
    if type not in event_types:
        return False, "Event Type not supported"
    

    pass

def log_milk_added_event(firestore_client, type: str) -> Tuple[bool, str]:
    """
    Logs an event to the database
    """
    pass
