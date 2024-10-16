import firebase_admin as fba
from firebase_admin import firestore, credentials

from add_entry import *
from delete_entry import *

from retrieve import *
# from backend.firebase.retrieve_data import *

cred = credentials.Certificate('./firebase/key_gabe.json')
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

add_mother(fs_client, '0000', 'Felicia', 'Smith')
add_mother(fs_client, '0001', 'Anna', 'Meyers')

add_baby(fs_client, '0003', 'Johnny', 'Smith', '0000') # Felicia is mother

# add_mother(fs_client, 1, 0, 'Jane', 'Doe')
# add_mother(fs_client, 2, 0, 'Hong', 'Lin')

add_milk_entry(fs_client, 
               uid='0000',
               milk_type='EHA',
               express_time="NOT IMPLEMENTED YET",
               storage_type="NOT IMPLEMENTED YET",
               storage_location="fridge",
               volume_ml=100,
               owner_mrn='0000')

mother_info = retrieve_mother_by_mrn(fs_client, '0000')
baby_info = retrieve_baby_by_mrn(fs_client, '0003')
milk_entry = retrieve_milk_entry_by_uid(fs_client, '0000')

mothers = retrieve_all_mothers(fs_client)
print(mothers)

# delete_baby(fs_client, 0)
# delete_mother(fs_client, 0)
# delete_milk_entry(fs_client, 0)

# print(mother_info)
# print(baby_info)
# print(milk_entry)