# MilkGuard Firebase Docs 

Firebase considers stuff as ```collections``` and ```documents```. Within a collection, you can have a ```document```, which is the info that you're storing, or you can have a ```sub-collection``` which itself can contain ```documents``` or ```sub-collections```. It's a big JSON file.

```
<collection>: [
    <document>: {
        <field>: <value>,
        <field>: <value>
    },
    <document>: {
        <field>: <value>,
        <field>: <value>
    },
    <subcollection>: [
        <document>: {
            <field>: <value>,
            <field>: <value>
        },
        <document>: {
            <field>: <value>,
            <field>: <value>
        }
    ]
]
```
- Documents store information
- Subcollections can store documents or sub-collections

## Getting data from Cloud Firestore database

[Cloud Firestore Main Docs](https://firebase.google.com/docs/firestore/)

[Cloud Firestore: Adding data](https://firebase.google.com/docs/firestore/manage-data/add-data)

[Cloud Firestore: Reading data](https://firebase.google.com/docs/firestore/query-data/get-data)

[Cloud Firestore: Deleting data](https://firebase.google.com/docs/firestore/manage-data/delete-data)



## Key Information
1. Mothers and babies are identified with MRNs (Medical Record Number)
2. Milks are identified by their UID (Unique ID)
3. Babies and milks are associated with mothers by mother's MRN, unless in the edge case that babies are without a mother, then milks are associated with babies by baby MRNs.
4. Mother MRNs are used to generate barcodes.
5. Mother/Baby MRNs & Milk UIDs are used as keys in their respective collections. 
6. MRNs and UIDs are string representations of 6 digit, left zero-padded numbers, zero-indexed. For eg. 000000, 000001, 000002, etc.

## MilkGuard Data Structure

- ```mothers``` ... list of mother data objects
- ```babies``` ... list of baby data objects
- ```milks``` ... list of milk data objects

### Mother Data Layout
```
<mother-mrn>: {
    'mrn': <string>,
    'first_name': <string>,
    'last_name': <string>,
    'babies': [
        <string> // List of baby MRNs
    ],
    'milks': [
        <string> // List of milk UIDs
    ]
}
```

### Baby Data Layout
```
<baby-mrn>: {
    'mrn': <string>,
    'first_name': <string>,
    'last_name': <string>,
    'mother_mrn': <string>
}
```

### Milk Data Layout
```
<milk-id>: {
    'uid': <string>,
    'milk_type': <string>,
    'express_time': TIMESTAMP,
    'expiration_date': TIMESTAMP,
    'storage_type': <string>,
    'storage_location': <string>,
    'volume_ml': <int>,
    'owner_mrn': <string>
}
```