import firebase_admin as fba
from firebase_admin.db import Query, reference
from firebase_admin import firestore, credentials

# Default to universal read and write
# cred = credentials.ApplicationDefault()
cred = credentials.Certificate('./key/test-3900-1a1e0685bf51.json')

fba.initialize_app(cred)
db = firestore.client()

### Get individual document
# mother_ref = db.collection("mothers").document("template-mother")
# print(mother_ref.get().to_dict())

### Get all documents in a collection
mothers_ref = db.collection("mothers").stream()
for mother in mothers_ref:
    print(mother.to_dict())

# Set a 