from firebase.error_check import *

def retrieve_mother_by_mrn(firestore_client, mrn: str) -> dict:
    """
    Gets a mother from the database
    """
    if not mother_exists(firestore_client, mrn):
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
    if not baby_exists(firestore_client, mrn):
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
    if not milk_entry_exists(firestore_client, uid):
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

def retrieve_all_milk_entries(firestore_client) -> list:
    """
    Gets all milk entries from the database
    """
    milk_entries_collection = firestore_client.collection("milk_entries")
    milk_entries_list = []
    for milk_entry in milk_entries_collection.stream():
        milk_entries_list.append(milk_entry.to_dict())

    return milk_entries_list
