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
    uid = f"{uid:04}"

    if mother_collection.document(uid).get().exists:
        print("ADD MOTHER: Mother already exists")
        return False

    try:         
        mother_collection.document(uid).set({
            'uid': uid,
            'mrn': mrn,
            'first_name': first_name,
            'last_name': last_name,
        })
    except Exception as e:
        print(f"An error occurred while loading data: {e}")

def add_baby(firestore_client,
             uid: int,
             mrn: int, 
             first_name: str,
             last_name: str,
             mother_id: int) -> bool:
    """
    Adds a baby to the database
    """
    # Check if mother uid exists
    mother_collection = firestore_client.collection("mothers")
    mother_id = f"{mother_id:04}"
    if not mother_collection.document(mother_id).get().exists:
        print("ADD BABY: Mother does not exist")
        return False

    # Check if uid in use
    baby_collection = firestore_client.collection("babies")
    uid = f"{uid:04}"
    if baby_collection.document(uid).get().exists:
        print("ADD BABY: Baby already exists")
        return False
    
    try:
        baby_collection.document(uid).set({
            'uid': uid,
            'mrn': mrn,
            'first_name': first_name,
            'last_name': last_name,
            'mother_id': mother_id,
        })
    except Exception as e:
        print(f"An error occurred while loading data: {e}")

def add_milk_entry(firestore_client,
                   uid: int,
                   milk_type: str,
                   express_time: str,
                   storage_method: str,
                   storage_location: str,
                   volume_ml: int,
                   mother_id: int,
                   baby_id: int) -> bool:
    """
    Adds a milk entry to the database
    """
    # Check if baby uid exists
    baby_collection = firestore_client.collection("babies")
    baby_id = f"{baby_id:04}"
    if not baby_collection.document(baby_id).get().exists:
        print("ADD MILK ENTRY: Baby does not exist")
        return False
    
    # Check if mother uid exists
    mother_collection = firestore_client.collection("mothers")
    mother_id = f"{mother_id:04}"
    if not mother_collection.document(mother_id).get().exists:
        print("ADD MILK ENTRY: Mother does not exist")
        return False

    # Check if uid in use
    milk_collection = firestore_client.collection("milk_entries")
    uid = f"{uid:04}"
    if milk_collection.document(uid).get().exists:
        print("ADD MILK ENTRY: Milk entry already exists")
        return False

    try:
        milk_collection.document(uid).set({
            'uid': uid,
            'milk_type': milk_type,
            'express_time': express_time,
            'expiration_date': "NOT IMPLEMENTED YET",
            'storage_type': storage_method,
            'storage_location': storage_location,
            'volume_ml': volume_ml,
            'mother_id': mother_id,
            'baby_id': baby_id,
        })
    except Exception as e:
        print(f"ADD MILK ENTRY: An error occurred while loading data: {e}")
