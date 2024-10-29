from typing import Tuple
from firebase.error_check import *
from firebase.retrieve import retrieve_all_milk_entries, retrieve_mother_by_mrn, retrieve_baby_by_mrn

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
    milk_entries = retrieve_all_milk_entries(firestore_client)

    if len(milk_entries) == 0:
        return False, []

    for milk_entry in milk_entries:
        # Get mother details, should always have a valid mother mrn
        mother_doc = retrieve_mother_by_mrn(firestore_client, milk_entry['mother_mrn'])

        # Get baby details, should always have a valid baby mrn
        baby_doc = retrieve_baby_by_mrn(firestore_client, milk_entry['baby_mrn'])

        milk_entry['mother_name'] = mother_doc['first_name'] + ' ' + mother_doc['last_name']
        milk_entry['baby_name'] = baby_doc['first_name'] + ' ' + baby_doc['last_name'] if baby_doc else ""

    return True, milk_entries