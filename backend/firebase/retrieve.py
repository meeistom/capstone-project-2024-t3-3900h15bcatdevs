from firebase.error_check import *
from typing import Tuple


def retrieve_from_collection(
    firestore_client, collection: str, mrn_uid: str = None, order: str = "DESC"
) -> list:
    """
    Retrieves all documents from a collection. If MRN/UID provided then returns appropriate document.

    Args:
        firestore_client (Firestore Client): Firestore Client object.
        collection (str): Collection to retrieve from.
        mrn (str, optional): MRN of mother/baby. Defaults to None.
        order (str, optional): Order to return the results in. Defaults to "DESC".

    Returns:
        list: List of mother objects.
    """
    assert collection in collection_names

    collection_stream = firestore_client.collection(collection).stream()

    return_list = []

    if mrn_uid:
        # Check if document exists
        if not exists_in_collection(firestore_client, collection, mrn_uid):
            return []

        doc = firestore_client.collection(collection).document(mrn_uid).get()
        return_list.append(doc.to_dict())
    else:
        for doc in collection_stream:
            return_list.append(doc.to_dict())

    # If milk, entries, sorts for returning most recently created first
    if collection == "milk_entries":
        return_list.sort(key=lambda x: x["created_at"], reverse=(order == "DESC"))
 
    # Add babies names to mother objects
    if collection == 'mothers':
        for mother in return_list:
            mother['babies'] = get_baby_names(firestore_client, mother_mrn=mother['mrn'])

    # Add mother names to return baby objects
    if collection == 'babies':
        for baby in return_list:
            baby['mother_name'] = get_mother_name(firestore_client, baby_mrn=baby['mrn'])

    return return_list


def retrieve_milk_entries(
    firestore_client, field: str = None, search_value: str = None, order: str = "DESC"
) -> list:
    """
    Gets milk entries from the database by field specified matches, otherwise returns all in descending order from creation

    Args:
        firestore_client (Firestore Client): Firestore Client object.
        field (str): Field to search in milk entry objects.
        search_value (str): Value to search for in the field.
        order (str): Order to return the results in.

    Returns:
        list: Milk entries with the specified uid or all milk entries if no selection.
    """
    if field:
        assert is_valid_data_field("milk_entries", field)

    milk_entries_collection = firestore_client.collection("milk_entries").stream()

    milk_entries_list = []
    for milk_doc in milk_entries_collection:
        if field == "uid" and milk_doc.id != search_value:
            continue

        milk_entries_list.append(milk_doc.to_dict())

    # Sorts for returning most recently created first
    milk_entries_list.sort(key=lambda x: x["created_at"], reverse=(order == "DESC"))

    return milk_entries_list


def get_mother_name(firestore_client, baby_mrn: str) -> str:
    """
    Gets the mother's name from the database given a baby's MRN.

    Args:
        firestore_client (Firestore Client): Firestore Client object.
        baby_mrn (str): MRN of baby.

    Returns:
        str: Mother's name
    """
    if not exists_in_collection(firestore_client, collection_name="babies", mrn_uid=baby_mrn):
        return ""
    
    baby_document = firestore_client.collection('babies').document(baby_mrn).get().to_dict()
    mother_mrn = baby_document['mother_mrn']
    mother_document = firestore_client.collection('mothers').document(mother_mrn).get().to_dict()

    return mother_document['first_name'] + ' ' + mother_document['last_name']

def get_baby_names(firestore_client, mother_mrn: str) -> list:
    """
    Gets a list of baby names associated with a mother's MRN, in her babies mrn list
    """
    if not exists_in_collection(firestore_client, collection_name="mothers", mrn_uid=mother_mrn):
        return []
    
    mother_document = firestore_client.collection('mothers').document(mother_mrn).get().to_dict()
    baby_mrns = mother_document['babies']
    baby_names = []
    for baby_mrn in baby_mrns:
        baby_document = firestore_client.collection('babies').document(baby_mrn).get().to_dict()
        baby_names.append(baby_document['first_name'] + ' ' + baby_document['last_name'])

    return baby_names

def get_babies_associated_milks(firestore_client) -> list:
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
    # associated_milks = retrieve_milk_entries(firestore_client, "baby_mrn", baby['mrn'], "DESC")
        
    return baby_list