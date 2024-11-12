from firebase.error_check import *
from firebase.history import log_event
from firebase.retrieve import get_full_name

def verify(firestore_client, barcode: str) -> Tuple[bool, dict]:
    """
    Verify the existence of a scanned barcode in the database.

    Args:
        firestore_client (Firestore Client): Firestore Client object.
        barcode (str): Scanned barcode string.

    Returns:
        Tuple: 
        (True if the barcode contains an MRN/UID registered in the system),
        (Collection name to which the MRN/UID belongs if found, including extra details if it is a milk entry)
    """
    success, message = exists_in_db(firestore_client, barcode)
    ret_json = { 'collection': 'None' if message is None else message }
    if message == "milk_entries":
        expired, expiration_time = is_milk_expired(firestore_client, barcode)
        ret_json.update(
            {
                'expired': expired,
                'expiration_time': expiration_time
            }
        )
    
    return success, ret_json

def verify_feed(firestore_client, milk_uid: str, baby_mrn: str) -> Tuple[bool, dict]:
    """
    Verify that the specified milk UID belongs to the specified baby MRN.

    Args:
        firestore_client (Firestore Client): Firestore Client object.
        milk_uid (str): Unique identifier for the milk entry.
        baby_mrn (str): Medical record number of the baby.

    Returns:
        Tuple:
        (True if milk UID and baby MRN match, and the milk is within the expiry time),
        (Dict containing expiry and match details)
    """
    if not exists_in_collection(firestore_client, 'milk_entries', milk_uid):
        return False, { 'error': 'Invalid milk barcode' }
    
    if not exists_in_collection(firestore_client, 'babies', baby_mrn):
        return False, { 'error': 'Invalid baby barcode' }

    milk_entry_collection = firestore_client.collection("milk_entries")
    milk_entry = milk_entry_collection.document(milk_uid).get().to_dict()
    
    match = milk_entry['baby_mrn'] == baby_mrn
    ret_json = { 'match': match }

    if match: # Milk entry is valid
        expired, expiration_time = is_milk_expired(firestore_client, milk_uid)
        ret_json.update(
            {
                'expired': expired,
                'expiration_time': expiration_time
            }
        )
    else:
        mismatch_baby_name = get_full_name(firestore_client, mrn=baby_mrn)
        milk_owner_baby_name = get_full_name(firestore_client, mrn=milk_entry['baby_mrn'])
        ret_json['mismatch_baby_name'] = mismatch_baby_name
        ret_json['milk_owner_baby_name'] = mismatch_baby_name

    # Log verification event
    event_err = log_event(firestore_client, event_type="Verification", data=ret_json)
    if not event_err:
        print("(HISTORY) Error logging Verification event")

    return (
        True if match and not expired else False,
        ret_json
    )
