from firebase.error_check import *
from typing import Tuple

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
            collection_ref.document(mrn_uid).delete()
            deleted_documents.append(mrn_uid)
        except Exception as e:
            print(f"DELETE DOCUMENT: An error occurred while deleting data: {e}")
            return False, "Failed to delete document"
    

    return True, f"Successfully deleted document {deleted_documents}"

                
