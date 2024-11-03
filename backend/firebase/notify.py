from firebase.error_check import *
from datetime import datetime

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

    milk_entries_collection = firestore_client.collection('milk_entries')
    for doc in milk_entries_collection.stream():
        milk_entry = doc.to_dict()

        # Get all relevant information
        expired = datetime.fromtimestamp(milk_entry['expiration_time']) < datetime.now()
        expiration_duration = datetime.fromtimestamp(milk_entry['expiration_time']) - datetime.now()
        days = expiration_duration.days
        hours, remainder = divmod(expiration_duration.seconds, 3600)
        minutes = remainder // 60

        # Get baby info
        if not exists_in_collection(firestore_client, 'babies', milk_entry['baby_mrn']):
            continue
        
        baby_document = firestore_client.collection('babies').document(milk_entry['baby_mrn']).get().to_dict()
        baby_name = baby_document['first_name'] + ' ' + baby_document['last_name']

        mother_document = firestore_client.collection('mothers').document(milk_entry['mother_mrn']).get().to_dict()
        mother_name = mother_document['first_name'] + ' ' + mother_document['last_name']

        notif_object = {
            'uid': milk_entry['uid'],
            'days_expiry': days,
            'hours_expiry': hours,
            'minutes_expiry': minutes,
            'expired': expired,
            'baby_name': baby_name,
            'mother_name': mother_name
        }
        notifications.append(notif_object)
    
    return notifications

# if __name__ == '__main__':
#     get_milk_updates(fs_client)
