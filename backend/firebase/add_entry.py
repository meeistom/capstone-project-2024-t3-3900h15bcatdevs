from firebase.retrieve import is_valid_mother, is_valid_baby, is_valid_milk_entry

def add_mother(firestore_client,
               mrn: str,
               first_name: str,
               last_name: str) -> bool:
    """
    Adds a mother to the database
    """
    # Check if uid in use
    if is_valid_mother(firestore_client, mrn):
        print("ADD MOTHER: Mother already exists")
        return False

    try:         
        mother_collection = firestore_client.collection("mothers") # Check if collection exists?
        mother_collection.document(mrn).set({
            'mrn': mrn,
            'first_name': first_name,
            'last_name': last_name,
            'babies': [],
            'milks': []
        })
    except Exception as e:
        print(f"An error occurred while loading data: {e}")

    return True

def add_baby(firestore_client,
             mrn: str, 
             first_name: str,
             last_name: str,
             mother_mrn: str) -> bool:
    """
    Adds a baby to the database
    """
    # Check if mother uid exists
    if not is_valid_mother(firestore_client, mother_mrn) and mother_mrn != "None":
        print("ADD BABY: Mother does not exist")
        return False

    # Check if uid in use
    if is_valid_baby(firestore_client, mrn):
        print("ADD BABY: Baby already exists")
        return False
    
    try:
        baby_collection = firestore_client.collection("babies")
        baby_collection.document(mrn).set({
            'mrn': mrn,
            'first_name': first_name,
            'last_name': last_name,
            'mother_mrn': mother_mrn,
        })
    except Exception as e:
        print(f"An error occurred while loading data: {e}")

    return True

def add_milk_entry(firestore_client,
                   uid: str,
                   milk_type: str,
                   express_time: str,
                   storage_type: str,
                   storage_location: str,
                   volume_ml: int,
                   owner_mrn: str) -> bool:
    """
    Adds a milk entry to the database
    """
    # Check if baby uid exists
    if not is_valid_baby(firestore_client, owner_mrn) and not is_valid_mother(firestore_client, owner_mrn):
        print("ADD MILK ENTRY: Owner Baby or Mother does not exist")
        return False

    # Check if uid in use
    if is_valid_milk_entry(firestore_client, uid):
        print("ADD MILK ENTRY: Milk entry already exists")
        return False

    try:
        milk_collection = firestore_client.collection("milk_entries")
        milk_collection.document(uid).set({
            'uid': uid,
            'milk_type': milk_type,
            'express_time': express_time,
            'expiration_date': "NOT IMPLEMENTED YET",
            'storage_type': storage_type,
            'storage_location': storage_location,
            'volume_ml': volume_ml,
            'owner_mrn': owner_mrn,
        })
    except Exception as e:
        print(f"ADD MILK ENTRY: An error occurred while loading data: {e}")

    return True