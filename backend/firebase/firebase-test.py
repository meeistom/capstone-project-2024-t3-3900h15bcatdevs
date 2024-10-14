import firebase_admin as fba
from firebase_admin.db import Query, reference
from firebase_admin import firestore, credentials

from add_entry import *
from delete_entry import *
from get_entry import *

cred = credentials.Certificate('./key_gabe.json')
# cred = credentials.Certificate('./key_<catdev-name>.json')

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

add_mother(fs_client, 0, 0, 'Felicia', 'Smith')
add_mother(fs_client, 1, 0, 'Anna', 'Meyers')

add_baby(fs_client, 0, 0, 'Johnny', 'Bee', 0)

# add_mother(fs_client, 1, 0, 'Jane', 'Doe')
# add_mother(fs_client, 2, 0, 'Hong', 'Lin')

add_milk_entry(fs_client, 0, 'EHA', "fridge", "fridge0", 100, 0, 0)

mother_info = get_mother(fs_client, 0)
baby_info = get_baby(fs_client, 0)
milk_entry = get_milk_entry(fs_client, 0)

# delete_baby(fs_client, 0)
# delete_mother(fs_client, 0)
# delete_milk_entry(fs_client, 0)

print(mother_info)
print(baby_info)
print(milk_entry)