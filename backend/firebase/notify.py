from firebase.retrieve import *
from firebase.error_check import *
from datetime import datetime, timedelta

# # TESTING
# import firebase_admin as fba
# from firebase_admin import firestore, credentials
# cred = credentials.Certificate('./.key/key.json')
# fba.initialize_app(cred)
# fs_client = firestore.client()


def get_milk_updates(firestore_client):
    """
    Constructs notification objects on milk entries that are close to expiring or expired.

    Args:
        firestore_client (Firestore Client): Firestore Client object.

    Returns:
        list: List of notification objects
    """
    notifications = []

    milk_entries_collection = firestore_client.collection('milk_entries').stream()
    for doc in milk_entries_collection:
        milk_entry = doc.to_dict()

        # Only get the ones that are within 6 hours of expiry
        if not datetime.fromtimestamp(milk_entry['expiration_time']) <= datetime.now() + timedelta(hours=6):
            continue

        # Get all relevant information
        expired = datetime.fromtimestamp(milk_entry['expiration_time']) < datetime.now()
        expiration_duration = datetime.fromtimestamp(milk_entry['expiration_time']) - datetime.now()
        days = expiration_duration.days
        hours, remainder = divmod(expiration_duration.seconds, 3600)
        minutes = remainder // 60

        # Get baby info
        baby_doc = retrieve_baby_by_mrn(firestore_client, milk_entry['baby_mrn'])
        if baby_doc == {}:
            continue

        baby_name = baby_doc['first_name'] + ' ' + baby_doc['last_name']
        notif_object = {
            'milk_uid': milk_entry['uid'],
            'days_expiry': days,
            'hours_expiry': hours,
            'minutes_expiry': minutes,
            'expired': expired,
            'baby_name': baby_name
        }
        notifications.append(notif_object)
    
    return notifications

# if __name__ == '__main__':
#     get_milk_updates(fs_client)
