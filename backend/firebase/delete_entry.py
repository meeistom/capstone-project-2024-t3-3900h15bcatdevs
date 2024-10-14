def delete_mother(firestore_client, mother_uid: int) -> bool:
    """
    Deletes a mother from the database
    """
    mother_collection = firestore_client.collection("mothers")
    mother_uid = f"{mother_uid:04}"
    if not mother_collection.document(mother_uid).get().exists:
        print("DELETE MOTHER: Mother does not exist")
        return False
    else:
        try:
            mother_collection.document(mother_uid).delete()
        except Exception as e:
            print(f"DELETE MOTHER: An error occurred while deleting data: {e}")

def delete_baby(firestore_client, baby_uid: int) -> bool:
    """
    Deletes a baby from the database
    """
    baby_collection = firestore_client.collection("babies")
    baby_uid = f"{baby_uid:04}"
    if not baby_collection.document(baby_uid).get().exists:
        print("DELETE BABY: Baby does not exist")
        return False
    else:
        try:
            baby_collection.document(baby_uid).delete()
        except Exception as e:
            print(f"DELETE BABY: An error occurred while deleting data: {e}")
    

def delete_milk_entry(firestore_client, milk_entry_uid: int) -> bool:
    """
    Deletes a milk entry from the database
    """
    milk_collection = firestore_client.collection("milks")
    milk_entry_uid = f"{milk_entry_uid:04}"
    if not milk_collection.document(milk_entry_uid).get().exists:
        print("DELETE MILK ENTRY: Milk entry does not exist")
        return False
    else:
        try:
            milk_collection.document(milk_entry_uid).delete()
        except Exception as e:
            print(f"DELETE MILK ENTRY: An error occurred while deleting data: {e}")
