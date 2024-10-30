from firebase.error_check import *
from firebase_admin import firestore

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
           
    
def retrieve_mother_by_name(firestore_client, field: str, name: str) -> list:
    """
    Gets mothers from the database by 'first_name' or 'last_name' case insensitive.
    """
    query = firestore_client.collection("mothers").get()
    name_lower = name.lower()

    mothers_list = [
        doc_dict for doc in query
        if (doc_dict := doc.to_dict()).get(field, "").lower() == name_lower
    ]

    if not mothers_list:
        print(f"GET MOTHERS: No mothers found with {field}: {name}")
        
    return mothers_list

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

def retrieve_all_mothers(firestore_client) -> list:
    """
    Gets all mothers from the database
    """
    mothers_collection = firestore_client.collection("mothers")
    mothers_list = []
    for mother in mothers_collection.stream():
        mothers_list.append(mother.to_dict())
        
    return mothers_list

def retrieve_all_babies(firestore_client) -> list:
    """
    Gets all babies from the database
    """
    babies_collection = firestore_client.collection("babies")
    babies_list = []
    for baby in babies_collection.stream():
        babies_list.append(baby.to_dict())

    return babies_list

def retrieve_all_milk_entries(fs_client, order_direction="DESC"):
    db = fs_client
    milk_entries_collection = db.collection('milk_entries')
    if order_direction.upper() == "ASC":
        direction = firestore.Query.ASCENDING
    else:
        direction = firestore.Query.DESCENDING

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
def display_milk_entry(fs_client, order_direction="DESC") -> list:
    milk_entries_list = retrieve_all_milk_entries(fs_client, order_direction)
    
    for entry in milk_entries_list:
        mother_mrn = entry.get('owner_mrn')
        if mother_mrn:
            mother_details = retrieve_mother_by_mrn(fs_client, mother_mrn)
            if mother_details:
                entry['mother_first_name'] = mother_details.get('first_name', 'Unknown')
                entry['mother_last_name'] = mother_details.get('last_name', 'Unknown')
            else:
                entry['mother_first_name'] = 'Unknown'
                entry['mother_last_name'] = 'Unknown'
        else:
            entry['mother_first_name'] = 'Unknown'
            entry['mother_last_name'] = 'Unknown'
    return milk_entries_list