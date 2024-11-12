from typing import Tuple
from firebase.error_check import *
from firebase.retrieve import *

def get_babies_associated_milks(firestore_client) -> Tuple[bool, list]:
    """
    Returns a list of babies with an extra field that includes a list of their 
    associated milk entries
    
    Args:
        firestore_client (Firestore Client): Firestore Client object.

    Returns:
        list: All babies with associated milks.
    """
    baby_list = retrieve_from_collection(firestore_client, collection="babies")
    milk_entries = retrieve_from_collection(firestore_client, collection="milk_entries")
    
    if len(baby_list) == 0:
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
        
        for baby in baby_list:
            if "associated_milks" not in baby:
                baby['associated_milks'] = []
            
            if milk_entry['baby_mrn'] == baby['mrn']:
                baby['associated_milks'].append(milk_entry)
        
    return True, baby_list