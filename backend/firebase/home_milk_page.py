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
        # Get mother & baby names, should always have a valid mrns
        mother_name = get_full_name(firestore_client, mrn=milk_entry['mother_mrn'])
        baby_name = get_full_name(firestore_client, mrn=milk_entry['baby_mrn'])

        milk_entry['mother_name'] = mother_name
        milk_entry['baby_name'] = baby_name

    return True, milk_entries