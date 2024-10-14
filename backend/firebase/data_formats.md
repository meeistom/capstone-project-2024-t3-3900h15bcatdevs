Structure for how the database structures its data (schema)

[Cloud Firestore Main Docs](https://firebase.google.com/docs/firestore/)

[Cloud Firestore: Adding data](https://firebase.google.com/docs/firestore/manage-data/add-data)

[Cloud Firestore: Reading data](https://firebase.google.com/docs/firestore/query-data/get-data)

[Cloud Firestore: Deleting data](https://firebase.google.com/docs/firestore/manage-data/delete-data)

Firebase considers stuff as ```collections``` and ```documents```. You can have a sub-collections within a collection, alongside documents. 

Top level collections:
- ```mothers```
- ```babies```
- ```milks```

```mother-id```, ```baby-id```, ```milk-id``` are all generated during registration/add milk processes, and also used as the encoded information in the barcode. Also used as keys for their respective collections in the database.

```mother-id```, ```baby-id```, ```milk-id``` are all integers.

### Mother Data
```
<mother-id>: {
    'uid': <string>,
    'mrn': <int>,
    'first_name': <string>,
    'last_name': <string>,
}
```

### Baby Data
```
<baby-id>: {
    'uid': <string>,
    'mrn': <int>,
    'first_name': <string>,
    'last_name': <string>,
    'mother_id': <string>, // Reference to mother collection
}
```

### Milk Data
```
<milk-id>: {
    'uid': <string>,
    'milk_type': <string>,
    'express_time': TIMESTAMP,
    'expiration_date': TIMESTAMP,
    'storage_type': <string>,
    'storage_location': <string>,
    'volume_ml': <int>,
    'mother_id': <string>, // Reference to mother collection
    'baby_id': <string>, // Reference to baby collection
}
```