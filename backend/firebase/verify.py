from error_check import *

def verify(firestore_client, barcode: str) -> Tuple[bool, str]:
    """
    Takes any scanned barcode and verifies its existence in the database
    """
    pass

def verify_feed(firestore_client, milk_uid: str, baby_mrn: str) -> Tuple[bool, str]:
    """
    Verifies that the milk uid specified belongs to the baby MRN specified.
    Returns True if the milk uid and baby MRN match and milk is within expiry, False otherwise.
    """
    if not exists_in_collection(firestore_client, 'milk_entries', milk_uid):
        return False, "VERIFY FEED: Milk UID does not exist"
    
    if not exists_in_collection(firestore_client, 'babies', baby_mrn):
        return False, "VERIFY FEED: Baby MRN does not exist"

    milk_entry_collection = firestore_client.collection("milk_entries")
    milk_entry = milk_entry_collection.document(milk_uid).get().to_dict()
    
    if milk_entry['baby_mrn'] == baby_mrn and not is_milk_expired(milk_entry['expiration_time']):
        return True, ""
    if milk_entry['baby_mrn'] != baby_mrn:
        print(f"VERIFY FEED: Milk entry baby MRN does not match")
        return False
    return True
