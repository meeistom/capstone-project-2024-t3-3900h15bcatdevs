def get_mother(firestore_client, mother_uid: int) -> dict:
    """
    Gets a mother from the database
    """
    mother_collection = firestore_client.collection("mothers")
    mother_uid = f"{mother_uid:04}"
    if not mother_collection.document(mother_uid).get().exists:
        print("GET MOTHER: Mother does not exist")
        return False
    else:
        try:
            return mother_collection.document(mother_uid).get().to_dict()
        except Exception as e:
            print(f"GET MOTHER: An error occurred while getting data: {e}")

def get_baby(firestore_client, baby_uid: int) -> dict:
    """
    Gets a baby from the database
    """
    baby_collection = firestore_client.collection("babies")
    baby_uid = f"{baby_uid:04}"
    if not baby_collection.document(baby_uid).get().exists:
        print("GET BABY: Baby does not exist")
        return False
    else:
        try:
            return baby_collection.document(baby_uid).get().to_dict()
        except Exception as e:
            print(f"GET BABY: An error occurred while getting data: {e}")

def get_milk_entry(firestore_client, milk_entry_uid: int) -> dict:
    """
    Gets a milk entry from the database
    """
    milk_collection = firestore_client.collection("milk_entries")
    milk_entry_uid = f"{milk_entry_uid:04}"
    if not milk_collection.document(milk_entry_uid).get().exists:
        print("GET MILK ENTRY: Milk entry does not exist")
        return False
    else:
        try:
            return milk_collection.document(milk_entry_uid).get().to_dict()
        except Exception as e:
            print(f"GET MILK ENTRY: An error occurred while getting data: {e}")