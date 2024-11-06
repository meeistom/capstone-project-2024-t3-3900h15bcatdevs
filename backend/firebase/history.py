from firebase.error_check import *

def log_event(firestore_client, event_data: dict) -> Tuple[bool, str]:
    """
    add milk
    verification fail or success
    baby registered
    milk expiry

    History Object
    {
        "type": "verification" OR "baby_registered" OR "milk_expiration" OR "milk_added",
        "event_timestamp": timestamp,
        "message": "Verification failed",

    
    }
    Logs an event to the database
    """
    pass
    
    
