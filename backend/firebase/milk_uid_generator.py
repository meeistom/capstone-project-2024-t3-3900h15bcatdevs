from typing import Tuple
from firebase.error_check import *

from firebase_admin import firestore

def get_new_milk_uid(firestore_client) -> Tuple[bool, str]:
    '''
    Generates a new milk entry UID

    Args:
        firestore_client (Firestore Client): Firestore Client Object

    Returns:
        milk_uid (str): New Milk Entry UID
    '''
    # Get milk uid counter from the database
    if not firestore_client.collection('stats').document('counters').get().exists:
        return False, "Error, stats document does not exist"

    stats_collection = firestore_client.collection('stats')
    uid_tracker_document = stats_collection.document('counters').get().to_dict()
    new_uid = uid_tracker_document['milk_uid_counter'] # Currently the largest UID in use

    if type(new_uid) != int:
        return False, "Error, milk uid counter is not an integer"

    # Check for overflow on counter, reset if overflow
    if new_uid > 999:
        new_uid = 0
        # Reset counter
        uid_counter_update = {
            'milk_uid_counter': new_uid
        }
    else:
        # Increment counter on database
        uid_counter_update = {
            'milk_uid_counter': firestore.Increment(1)
        }
    # Update firebase counter
    stats_collection.document('counters').update(uid_counter_update)

    # Make the 6 digit zero-padded UID
    new_uid = f"m{str(new_uid).zfill(3)}"

    # Checks that its not in the db, should never happen, unless we using dummy data
    while exists_in_collection(firestore_client, "milk_entries", str(new_uid)):
        new_uid += 1

    return True, new_uid

def get_new_milk_uid_placeholder(firestore_client) -> Tuple[bool, str]:
    '''
    Generates a new milk entry UID without actually incrementing database counter

    Args:
        firestore_client (Firestore Client): Firestore Client Object

    Returns:
        milk_uid (str): New Milk Entry UID
    '''
    # Get milk uid counter from the database
    if not firestore_client.collection('stats').document('counters').get().exists:
        return False, "Error, stats document does not exist"

    stats_collection = firestore_client.collection('stats')
    uid_tracker_document = stats_collection.document('counters').get().to_dict()
    uid_tracker = uid_tracker_document['milk_uid_counter'] # Currently the largest UID in use
    new_uid = int(uid_tracker)

    # Checks that its not in the db, should never happen, unless we using dummy data
    while exists_in_collection(firestore_client, "milk_entries", str(new_uid)):
        new_uid += 1

    # Make the 6 digit zero-padded UID
    new_uid = f"m{str(new_uid).zfill(3)}"

    return True, new_uid