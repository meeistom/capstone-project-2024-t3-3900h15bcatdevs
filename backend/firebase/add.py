from firebase.error_check import *
from firebase.retrieve import *
from typing import Tuple
from firebase_admin import firestore
from firebase.milk_uid_generator import get_new_milk_uid
from firebase.history import log_baby_registered_event, log_milk_added_event
from datetime import datetime


def add_mother(firestore_client, mother_json_data: dict) -> Tuple[bool, str]:
    """
    Adds a mother to the database
    """
    # Check if mother data is valid
    if not has_valid_request_data_fields(object_name="mothers", request_data=mother_json_data):
        return False, "Invalid mother data"

    # Check if mrn in use
    if exists_in_collection(firestore_client, "mothers", mother_json_data["mrn"]):
        return False, "Mother already exists"

    try:
        mother_collection = firestore_client.collection(
            "mothers"
        )  # Check if collection exists?
        mother_collection.document(mother_json_data["mrn"]).set(
            {
                "mrn": mother_json_data["mrn"],
                "first_name": mother_json_data["first_name"],
                "last_name": mother_json_data["last_name"],
                "babies": [],
                "milks": [],
            }
        )
    except Exception as e:
        print(f"An error occurred while loading data: {e}")
        return False, "A firebase error occurred."

    return True, "Successfully added mother"


def add_baby(firestore_client, baby_json_data: dict) -> Tuple[bool, str]:
    """
    Adds a baby to the database
    """
    # Check if baby data is valid
    if not has_valid_request_data_fields(object_name="babies", request_data=baby_json_data):
        return False, "Invalid baby data"

    # Check if mother mrn exists
    if not exists_in_collection(
        firestore_client, "mothers", baby_json_data["mother_mrn"]
    ):
        return False, "Mother does not exist"

    # Check if mrn in use
    if exists_in_collection(firestore_client, "babies", baby_json_data["mrn"]):
        return False, "Baby already exists"

    try:
        new_baby_entry = {
            "mrn": baby_json_data["mrn"],
            "first_name": baby_json_data["first_name"],
            "last_name": baby_json_data["last_name"],
            "mother_mrn": baby_json_data["mother_mrn"],
        }

        # Add baby to database
        baby_collection = firestore_client.collection("babies")
        baby_collection.document(baby_json_data["mrn"]).set(new_baby_entry)

        # Add mother to baby's mother's babies list
        mother_collection = firestore_client.collection("mothers")
        mother_document = mother_collection.document(baby_json_data["mother_mrn"])
        mother_document.update(
            {"babies": firestore.ArrayUnion([baby_json_data["mrn"]])}
        )

        # Log event to history
        mother_document = mother_document.get().to_dict()
        new_baby_entry["mother_name"] = (
            mother_document["first_name"]
            + " "
            + mother_document["last_name"]
        )
        event_err = log_baby_registered_event(firestore_client, new_baby_entry)
        if not event_err:
            print("(HISTORY) Error logging Baby Registered event")

    except Exception as e:
        print(f"An error occurred while loading data: {e}")
        return False, "A firebase error occurred."

    return True, "Successfully added baby"


def add_milk_entry(firestore_client, milk_entry_json_data: dict) -> Tuple[bool, dict]:
    """
    Adds a milk entry to the database
    """
    # Check if milk entry data is valid
    if not has_valid_request_data_fields(object_name="milk_entries", request_data=milk_entry_json_data):
        return False, "(ADD MILK) Invalid milk entry data"

    # Check expiration validity
    if datetime.fromtimestamp(milk_entry_json_data["expiration_time"]) < datetime.now():
        return False, "(ADD MILK) Expiration time is in the past"

    # Check if baby uid exists
    if not exists_in_collection(
        firestore_client, "babies", milk_entry_json_data["baby_mrn"]
    ):
        return False, "(ADD MILK) Baby does not exist"

    try:
        # Get the mother of the baby
        baby_collection = firestore_client.collection("babies")
        baby_doc = (
            baby_collection.document(milk_entry_json_data["baby_mrn"]).get().to_dict()
        )
        mother_mrn = baby_doc["mother_mrn"]

        # Get a new milk UID
        success, new_milk_uid = get_new_milk_uid(firestore_client)
        if not success:
            return False, "Stats document error"

        milk_collection = firestore_client.collection("milk_entries")

        new_milk_entry = {
            "uid": new_milk_uid,
            "milk_type": milk_entry_json_data["milk_type"],
            "express_time": milk_entry_json_data["express_time"],
            "expiration_time": milk_entry_json_data["expiration_time"],
            "storage_type": milk_entry_json_data["storage_type"],
            "storage_location": milk_entry_json_data["storage_location"],
            "volume_ml": milk_entry_json_data["volume_ml"],
            "baby_mrn": milk_entry_json_data["baby_mrn"],
            "mother_mrn": mother_mrn,
            "extra_notes": milk_entry_json_data["extra_notes"],
            "created_at": int(datetime.now().timestamp()),
            "expired": False,
            'additives': milk_entry_json_data['additives']
        }
        
        milk_collection.document(new_milk_uid).set(new_milk_entry)

        # Update the mother milk list
        mother_collection = firestore_client.collection("mothers")
        mother_collection.document(mother_mrn).update(
            {"milks": firestore.ArrayUnion([new_milk_uid])}
        )

    except Exception as e:
        print(f"ADD MILK ENTRY: An error occurred while loading data: {e}")
        return False, "A firebase error occurred."

    # Construct the home page milk entry object
    home_page_milk_entry = new_milk_entry.copy()

    # Get mother and baby name, should always be valid
    home_page_milk_entry["baby_name"] = (
        baby_doc["first_name"] + " " + baby_doc["last_name"]
    )

    mother_doc = retrieve_from_collection(
        firestore_client, collection="mothers", mrn_uid=mother_mrn
    )
    assert len(mother_doc) == 1
    mother_doc = mother_doc[0]

    home_page_milk_entry["mother_name"] = (
        mother_doc["first_name"] + " " + mother_doc["last_name"]
    )

    # Log event to history
    event_err = log_milk_added_event(firestore_client, home_page_milk_entry)
    if not event_err:
        print("(HISTORY) Error logging Milk Added event")

    return True, home_page_milk_entry
