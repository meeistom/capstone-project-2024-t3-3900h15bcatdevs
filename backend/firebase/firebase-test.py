import firebase_admin as fba
from firebase_admin.db import Query, reference
from firebase_admin import firestore, credentials

from manage_entities import *

# Default to universal read and write
# cred = credentials.ApplicationDefault()
cred = credentials.Certificate('./key/test-3900-1a1e0685bf51.json')

fba.initialize_app(cred)
fs_client = firestore.client()

### Get individual document
# mother_ref = db.collection("mothers").document("template-mother")
# print(mother_ref.get().to_dict())

### Get all documents in a collection
# mothers_ref = db.collection("mothers").stream()
# for mother in mothers_ref:
#     print(mother.to_dict())

# Insert a document
new_mother_id = 1
# new_mother = {
#     'uid': new_mother_id,
#     'mrn': 0,
#     'first-name': 'Jane',
#     'last-name': 'Doe',
# }
# db.collection("mothers").document(str(new_mother_id)).set(new_mother)

delete_mother(fs_client, 0)
delete_mother(fs_client, 1)
delete_mother(fs_client, 2)

add_mother(fs_client, 0, 0, 'Felicia', 'Smith')
add_mother(fs_client, 1, 0, 'Jane', 'Doe')
add_mother(fs_client, 2, 0, 'Hong', 'Lin')

mother_info = get_mother(fs_client, 0)
print(mother_info)