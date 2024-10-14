# Helper functions for adding entities to the database

# from firebase_admin.db import Reference

def add_mother(firestore_client,
               uid: int,
               mrn: int,
               first_name: str,
               last_name: str) -> bool:
    """
    Adds a mother to the database
    """
    # Check if uid in use
    mother_collection = firestore_client.collection("mothers") # Check if collection exists?
    if mother_collection.document(str(uid)).get().exists:
        print("Mother already exists")
        return False

    try:         
        mother_collection.document(str(uid)).set({
            'uid': uid,
            'mrn': mrn,
            'first-name': first_name,
            'last-name': last_name,
        })
    except Exception as e:
        print(f"An error occurred while loading data: {e}")

def add_baby(uid: int, baby_details: dict) -> bool:
    """
    Adds a baby to the database
    """
    pass

def add_milk_entry(uid: int, milk_entry_details: dict) -> bool:
    """
    Adds a milk entry to the database
    """
    pass

def delete_mother(firestore_client, mother_uid: str) -> bool:
    """
    Deletes a mother from the database
    """
    mother_collection = firestore_client.collection("mothers")
    if not mother_collection.document(str(mother_uid)).get().exists:
        print("Mother does not exist")
        return False
    else:
        try:
            mother_collection.document(str(mother_uid)).delete()
        except Exception as e:
            print(f"An error occurred while deleting data: {e}")

def delete_baby(firestore_client, baby_uid: str) -> bool:
    """
    Deletes a baby from the database
    """
    baby_collection = firestore_client.collection("babies")
    if not baby_collection.document(str(baby_uid)).get().exists:
        print("Baby does not exist")
        return False
    else:
        try:
            baby_collection.document(str(baby_uid)).delete()
        except Exception as e:
            print(f"An error occurred while deleting data: {e}")
    

def delete_milk_entry(firestore_client, milk_entry_uid: str) -> bool:
    """
    Deletes a milk entry from the database
    """
    milk_collection = firestore_client.collection("milks")
    if not milk_collection.document(str(milk_entry_uid)).get().exists:
        print("Milk entry does not exist")
        return False
    else:
        try:
            milk_collection.document(str(milk_entry_uid)).delete()
        except Exception as e:
            print(f"An error occurred while deleting data: {e}")

def get_mother(firestore_client, mother_uid: str) -> dict:
    """
    Gets a mother from the database
    """
    mother_collection = firestore_client.collection("mothers")
    if not mother_collection.document(str(mother_uid)).get().exists:
        print("Mother does not exist")
        return False
    else:
        try:
            return mother_collection.document(str(mother_uid)).get().to_dict()
        except Exception as e:
            print(f"An error occurred while getting data: {e}")