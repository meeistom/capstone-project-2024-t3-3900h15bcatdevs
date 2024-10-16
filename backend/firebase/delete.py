from firebase.retrieve import is_valid_mother, is_valid_baby, is_valid_milk_entry

def delete_mother(firestore_client, mother_mrn: str) -> bool:
    """
    Deletes a mother from the database
    """
    if not is_valid_mother(firestore_client, mother_mrn):
        # print("DELETE MOTHER: Mother does not exist")
        return False

    try:
        mother_collection = firestore_client.collection("mothers")
        mother_collection.document(mother_mrn).delete()
    except Exception as e:
        print(f"DELETE MOTHER: An error occurred while deleting data: {e}")

    return True

def delete_baby(firestore_client, baby_mrn: str) -> bool:
    """
    Deletes a baby from the database
    """
    if not is_valid_baby(firestore_client, baby_mrn):
        # print("DELETE BABY: Baby does not exist")
        return False

    try:
        baby_collection = firestore_client.collection("babies")
        baby_collection.document(baby_mrn).delete()
    except Exception as e:
        print(f"DELETE BABY: An error occurred while deleting data: {e}")
    
    return True

def delete_milk_entry(firestore_client, milk_entry_uid: str) -> bool:
    """
    Deletes a milk entry from the database
    """

    if not is_valid_milk_entry(firestore_client, milk_entry_uid):
        # print("DELETE MILK ENTRY: Milk entry does not exist")
        return False

    try:
        milk_collection = firestore_client.collection("milks")
        milk_collection.document(milk_entry_uid).delete()
    except Exception as e:
        print(f"DELETE MILK ENTRY: An error occurred while deleting data: {e}")

    return True