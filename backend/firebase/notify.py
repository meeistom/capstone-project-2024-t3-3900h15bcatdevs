from firebase.retrieve import *
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

    milk_entries_collection = firestore_client.collection('milk_entries').stream()
    for doc in milk_entries_collection:
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
        
        baby_name = get_full_name(firestore_client, mrn=milk_entry['baby_mrn'])
        mother_name = get_full_name(firestore_client, mrn=milk_entry['mother_mrn'])

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
