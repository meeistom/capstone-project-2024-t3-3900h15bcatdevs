from firebase.error_check import *
from firebase.retrieve import *


def search_by_keyword(firestore_client, collection: str, keyword: str) -> list:
    """
    Gets any matches from the database by a keyword. Returns a dict of collection name and lists of relevant documents

    Args:
        firestore_client (Firestore Client): Firestore Client object.
        keyword (str): Keyword to search for in the database.

    Returns:
        list: List of collection name and lists of relevant documents
    """
    # Check if collection exists
    assert collection in all_collection_names

    results = []

    # Check if keyword is empty
    if not keyword or keyword == "":
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
            if key not in [
                "first_name",
                "last_name",
                "extra_notes",
                "milk_type",
                "storage_location",
                "storage_type",
            ]:
                continue

            if keyword in str(value).lower():
                # Make copy of dict
                relevant_entry = doc_dict.copy()

                # Adding names to objects
                if collection == "mothers":
                    relevant_entry["babies"] = get_baby_names(
                        firestore_client, mother_mrn=doc_dict["mrn"]
                    )
                elif collection == "babies":
                    relevant_entry["mother_name"] = get_mother_name(
                        firestore_client, baby_mrn=doc_dict["mrn"]
                    )

                # Add to the results list
                results.append(relevant_entry)

    return results
