from firebase.error_check import *
from datetime import datetime, timedelta, timezone

SYDNEY_TIMEZONE = timezone(timedelta(hours=11))

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

        # Skip entries that are more than 6 hours away from expiring
        if datetime.fromtimestamp(milk_entry['expiration_time']) - datetime.now() > timedelta(hours=6):
            continue

        # Get all relevant information
        expired = datetime.fromtimestamp(milk_entry['expiration_time']) < datetime.now()
        expiration_duration = datetime.fromtimestamp(milk_entry['expiration_time']) - datetime.now()
        seconds = expiration_duration.total_seconds()

        days = int(seconds / (24 * 3600))
        hours = int((seconds / 3600) - days * 24) 
        minutes = int((seconds / 60) - hours * 60)

        # Get baby info
        if not exists_in_collection(firestore_client, 'babies', milk_entry['baby_mrn']):
            continue
        
        baby_document = firestore_client.collection('babies').document(milk_entry['baby_mrn']).get().to_dict()
        baby_name = baby_document['first_name'] + ' ' + baby_document['last_name']

        mother_document = firestore_client.collection('mothers').document(milk_entry['mother_mrn']).get().to_dict()
        mother_name = mother_document['first_name'] + ' ' + mother_document['last_name']

        notif_object = {
            'uid': milk_entry['uid'],
            'expiration_timestamp': milk_entry['expiration_time'],
            'days_expiry': days,
            'hours_expiry': hours,
            'minutes_expiry': minutes,
            'expired': expired,
            'baby_name': baby_name,
            'mother_name': mother_name
        }
        notifications.append(notif_object)
    
    # If milk, entries, sorts for returning most recently created first
    notifications.sort(key=lambda x: x["expiration_timestamp"], reverse=False)

    return notifications
