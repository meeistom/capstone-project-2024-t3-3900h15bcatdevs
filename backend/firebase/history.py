from firebase.error_check import *

event_types = ["Verification", "Baby Registered", "Milk Expiration", "Milk Added"]

def log_milk_added_event(firestore_client, data: dict) -> bool:
    """
    Logs an event to the database: Milk Added.

    Just addeds 

    Args:
        firestore_client: Firestore client
        data: Json data containing data to be logged

    Returns:
        True if successful, False otherwise
    """
    # Check valid data

    data['event_type'] = "MILK ADDED"

    try:
        history_collection = firestore_client.collection("history")
        history_collection.document().add(data)
    except Exception as e:
        print(f"(HISTORY) An error occurred while loading data: {e}")
        return False

def log_milk_expiration_event(firestore_client, data: dict) -> Tuple[bool, str]:
    """
    Logs an event to the database: Milk Expiration

    Args:
        firestore_client: Firestore client
        data: Json data containing data to be logged

    Returns:
        True if successful, False otherwise
    """
    # Check valid data
    pass

def log_verification_event(firestore_client, data: dict) -> bool:
    """
    Logs an event to the database: Verification

    Args:
        firestore_client: Firestore client
        data: Json data containing data to be logged
    
    Returns:
        True if successful, False otherwise
    """
    # Check for errors
    unix_timestamp = int(datetime.now().timestamp())

    if 'error' in data:
        message = data['error']
    elif not data['match']:
        message = 'FAIL - Mismatched Milk UID & Baby MRN scans'
    elif data['expired']:
        message = 'FAIL - Milk Expired' # Milk and baby match
    else: 
        message = 'SUCCESS - Milk & Baby Match'

    verification_data = {
        'type': 'Verification',
        'message': message,
        'details': {} if 'error' in data else data,
        'timestamp': unix_timestamp
    }

    try: 
        history_collection = firestore_client.collection("history")
        history_collection.document().add(data)
    except Exception as e:
        print(f"(HISTORY) An error occurred while loading data: {e}")
        return False

    

def log_baby_registered_event(firestore_client) -> Tuple[bool, str]:
    """
    Logs an event to the database: Baby Registered
    """
    pass

