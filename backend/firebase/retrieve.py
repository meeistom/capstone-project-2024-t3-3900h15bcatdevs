from firebase.error_check import *
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter

def retrieve_mothers(firestore_client, 
                    first_name: str = None, 
                    last_name: str = None) -> list:
    """
    Gets a mother from the database by first name, or last name or get all if no selection.

    Args:
        firestore_client (Firestore Client): Firestore Client object.
        first_name (str, optional): First name of mother. Defaults to None.
        last_name (str, optional): Last name of mother. Defaults to None.

    Returns:
        list: Mother objects with the name matching string or all mothers if no selection.
    """
    if first_name and last_name:
        print(f"INTERNAL USE ERROR: Both first and last name provided, only one expected")
        return []
    
    mother_collection_stream = firestore_client.collection("mothers").stream()

    mothers_list = []

    if first_name or last_name:
        field = "first_name" if first_name else "last_name"
        value = first_name if first_name else last_name

    for mother_doc in mother_collection_stream:
        if (first_name or last_name) and mother_doc.to_dict()[field].lower() != value.lower():
            continue

        mothers_list.append(mother_doc.to_dict())

    return mothers_list

def retrieve_mother_by_mrn(firestore_client, mrn: str) -> dict:
    """
    Gets a mother from the database
    """
    if not exists_in_collection(firestore_client, 'mothers', mrn):
        print(f"GET MOTHER: Mother MRN: {mrn} does not exist")
        return {}
    else:
        mother_collection = firestore_client.collection("mothers")
        try:
            return mother_collection.document(mrn).get().to_dict()
        except Exception as e:
            print(f"GET MOTHER: An error occurred while getting data: {e}")
           
def retrieve_baby_by_mrn(firestore_client, mrn: str) -> dict:
    """
    Gets a baby from the database
    """
    if not exists_in_collection(firestore_client, 'babies', mrn):
        # print("GET BABY: Baby does not exist")
        return {}
    else:
        baby_collection = firestore_client.collection("babies")
        try:
            return baby_collection.document(mrn).get().to_dict()
        except Exception as e:
            print(f"GET BABY: An error occurred while getting data: {e}")

def retrieve_milk_entry_by_uid(firestore_client, uid: str) -> dict:
    """
    Gets a milk entry from the database
    """
    if not exists_in_collection(firestore_client, 'milk_entries', uid):
        # print("GET MILK ENTRY: Milk entry does not exist")
        return {}
    else:
        milk_collection = firestore_client.collection("milk_entries")
    try:
        return milk_collection.document(uid).get().to_dict()
    except Exception as e:
        print(f"GET MILK ENTRY: An error occurred while getting data: {e}")

def retrieve_all_babies(firestore_client) -> list:
    """
    Gets all babies from the database
    """
    babies_collection = firestore_client.collection("babies")
    babies_list = []
    for baby in babies_collection.stream():
        babies_list.append(baby.to_dict())

    return babies_list

def retrieve_all_milk_entries(firestore_client, order_direction: str="DESC"):
    milk_entries_collection = firestore_client.collection('milk_entries')

    direction = firestore.Query.ASCENDING if order_direction.upper() == "ASC" else firestore.Query.DESCENDING

    query = milk_entries_collection.order_by('created_at', direction=direction)
    results = query.stream()

    entries = []
    
    for doc in results:
        entries.append(doc.to_dict())
    
    return entries

def retrieve_by_keyword(firestore_client, keyword: str) -> dict:
    """
    Gets any matches from the database by a keyword.
    """
    collections = ["mothers", "babies", "milk_entries"]
    results = {}
    keyword_lower = keyword.lower()  # for case-insensitive search

    for collection_name in collections:
        collection = firestore_client.collection(collection_name)

        try:
            query = collection.stream()
            results[collection_name] = [
                doc_dict for doc in query
                if keyword_lower in str(doc_dict := doc.to_dict()).lower()
            ]

            if not results[collection_name]:
                print(f"GET {collection_name.upper()}: No matches found for keyword='{keyword}' in {collection_name}")

        except Exception as e:
            print(f"GET {collection_name.upper()}: An error occurred while querying data: {e}")
            results[collection_name] = []

    return results