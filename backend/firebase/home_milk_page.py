from typing import Tuple
from firebase.error_check import *
from firebase.retrieve import *

def get_home_page_formatted_milks(firestore_client) -> Tuple[bool, list]:
    '''
    Milks available on the home page are formatted with mother and baby names.
    This is separate to the pure get milk entries function.

    Args: 
        firestore_client (Firestore Client): Firestore Client Object

    Returns:
        bool: True if success, False if failure
        list: List of formatted milk entries
    '''
    milk_entries = retrieve_from_collection(firestore_client, "milk_entries")

    if len(milk_entries) == 0:
        return False, []

    for milk_entry in milk_entries:
        # Get mother details, should always have a valid mother mrn
        mother_doc = retrieve_from_collection(firestore_client, collection='mothers', mrn_uid=milk_entry['mother_mrn'])

        assert len(mother_doc) == 1
        mother_doc = mother_doc[0]

        # Get baby details, should always have a valid baby mrn
        baby_doc = retrieve_from_collection(firestore_client, collection="babies", mrn_uid=milk_entry['baby_mrn'])

        assert len(baby_doc) == 1
        baby_doc = baby_doc[0]

        milk_entry['mother_name'] = mother_doc['first_name'] + ' ' + mother_doc['last_name']
        milk_entry['baby_name'] = baby_doc['first_name'] + ' ' + baby_doc['last_name'] if baby_doc else ""

    return True, milk_entries