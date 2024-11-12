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
    uid_tracker = uid_tracker_document['milk_uid_counter'] # Currently the largest UID in use
    new_uid = int(uid_tracker)

    # Checks that its not in the db, should never happen, unless we using dummy data
    while exists_in_collection(firestore_client, "milk_entries", str(new_uid)):
        new_uid += 1

    # Make the 6 digit zero-padded UID
    new_uid = str(new_uid).zfill(6)

    # Increment counter on database
    stats_collection.document('counters').update({
        'milk_uid_counter': firestore.Increment(1)
    })

    return True, new_uid