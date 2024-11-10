from firebase.error_check import *
from firebase.history import log_milk_expiration_event
import time


CHECK_INTERVAL = 60  # Check every minute


def check_milk_thread_function(firestore_client):
    """
    Checks the expiration dates of all milks in the database and logs an event if a milk has expired.
    """
    while True:
        # Go through all milk entries from the database
        milk_entries = firestore_client.collection("milk_entries").stream()
        for milk_entry in milk_entries:
            milk_entry_data = milk_entry.to_dict()

            # Skip milk isnt expired
            if (
                not datetime.fromtimestamp(milk_entry_data["expiration_time"])
                < datetime.now()
            ):
                continue

            # Log the milk thing event
            event_err = log_milk_expiration_event(firestore_client, milk_entry_data)
            if not event_err:
                print("(MILK EXPIRATION CHECKER) Error logging event")

        time.sleep(CHECK_INTERVAL)
