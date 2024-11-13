from firebase.error_check import *
from firebase.history import log_event
from typing import Tuple
from firebase.retrieve import get_full_name
from firebase_admin import firestore

def delete_document(
    firestore_client,
    mother_mrn: str = None,
    baby_mrn: str = None,
    milk_entry_uid: str = None,
) -> Tuple[bool, str]:
    """
    Deletes a document from the database
    """
    if not mother_mrn and not baby_mrn and not milk_entry_uid:
        return False, "No MRN/UID given"
    
    collection_document_pairs = {
        'mothers': mother_mrn,
        'babies': baby_mrn,
        'milk_entries': milk_entry_uid
    }
    deleted_documents = []
    for collection_name, mrn_uid in collection_document_pairs.items():
        if mrn_uid is None:
            continue

        if not exists_in_collection(firestore_client, collection_name, mrn_uid):
            return False, f"MRN/UID {mrn_uid} does not exist in collection {collection_name}"
        
        try:
            collection_ref = firestore_client.collection(collection_name)

            # Get a copy of the document data before deletion
            document = collection_ref.document(mrn_uid).get().to_dict()

            collection_ref.document(mrn_uid).delete()
            deleted_documents.append(mrn_uid)
        except Exception as e:
            print(f"DELETE DOCUMENT: An error occurred while deleting data: {e}")
            return False, "Failed to delete document"
        
        if collection_name == "babies":
            mother_doc = firestore_client.collection("mothers").document(document["mother_mrn"])
            mother_doc.update({
                "babies": firestore.ArrayRemove([mrn_uid])
            })
        
        elif collection_name == "milk_entries":
            # Remove the milk entry from the mother
            mother_doc = firestore_client.collection("mothers").document(document["mother_mrn"])
            mother_doc.update({
                "milks": firestore.ArrayRemove([document["uid"]])
            })

            # Log milk deleted event if the document was a milk entry
            _, mother_name = get_full_name(firestore_client, document["mother_mrn"])
            _, baby_name = get_full_name(firestore_client, document["baby_mrn"])
            document['mother_name'] = mother_name
            document['baby_name'] = baby_name
            event_success = log_event(firestore_client, event_type="Milk Deleted", data=document)
            if not event_success:
                print("(HISTORY) Error logging Milk Added event")
    

    return True, f"Successfully deleted document {deleted_documents}"

                
