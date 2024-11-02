from firebase.error_check import *


def search_by_keyword(firestore_client, collection: str, keyword: str) -> dict:
    """
    Gets any matches from the database by a keyword. Returns a dict of collection name and lists of relevant documents

    Args:
        firestore_client (Firestore Client): Firestore Client object.
        keyword (str): Keyword to search for in the database.

    Returns:
        dict: Dictionary of collection name and lists of relevant documents
    """
    # Check if collection exists
    assert collection in collection_names

    results = []

    # Check if keyword is empty
    if not keyword:
        return []

    keyword = keyword.lower()  # force case-insensitive search

    # Search in appropriate collection
    collection_stream = firestore_client.collection(collection).stream()

    for doc in collection_stream:
        doc_dict = doc.to_dict()

        # Detecting if keyword is the MRN or UID itself
        if doc.id == keyword:
            results.append(doc_dict)
            continue

        # Searching for keyword in document attributes
        for key, value in doc_dict.items():
            match key:
                # Substring searching names and text fields
                case "first_name" | "last_name" | 'extra_notes' | 'milk_type' | 'storage_location' | 'storage_type':
                    (
                        results.append(doc_dict)
                        if keyword in str(value).lower()
                        else None
                    )
                # For mothers, searching for keyword matches in mother's babies and milks
                case "babies" | "milks":
                    for baby_milk_entry in value:
                        (
                            results.append(doc_dict)
                            if baby_milk_entry.startswith(keyword)
                            else None
                        )
                # For searching timestamps??

    return results
