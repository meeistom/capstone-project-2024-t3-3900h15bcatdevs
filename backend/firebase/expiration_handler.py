from firebase.error_check import *
from firebase.history import log_event
import time


CHECK_INTERVAL = 60  # Check every minute


def check_milk_thread_function(firestore_client):
    """
    Checks the expiration dates of all milks in the database and logs an event if a milk has expired.
    """
    while True:
        print("(MILK EXPIRATION CHECKER) Checking for expired milks...", flush=True)

        # Go through all milk entries from the database
        milk_entries = firestore_client.collection("milk_entries").stream()
        for milk_entry in milk_entries:
            milk_entry_data = milk_entry.to_dict()

            expired, _ = is_milk_expired(firestore_client, milk_entry.id)

            # Skip if milk is not expired or flagged expired/logged
            if not expired or milk_entry_data["expired"]:
                continue

            # Milk has just expired, but not yet flagged as expired, then its just expired

            # Log the milk thing event
            event_err = log_event(firestore_client, event_type="Milk Expiration", data=milk_entry_data)
            if not event_err:
                print("(MILK EXPIRATION CHECKER) Error logging event", flush=True)

            print(
                f"(MILK EXPIRATION CHECKER) Milk {milk_entry_data['uid']} expired!",
                flush=True,
            )

            # Change milk expiry flag
            milk_entries_collection = firestore_client.collection("milk_entries")
            milk_doc = milk_entries_collection.document(milk_entry.id)
            milk_doc.update({"expired": True})

        print(f"(MILK EXPIRATION CHECKER) Milk checks finished!")

        time.sleep(CHECK_INTERVAL)
