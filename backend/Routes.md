# USING THE BACKEND (for frontend peeps)

> ❗️ Info on Data
>
> Data Structure/Schema/Layout -> ```firebase/firestore-data.md```

## Dummy Data
To add dummy data or clear data from the database, uncomment/run the appropriate functions in ```backend/firebase/db_control.py```.

```
if __name__ == '__main__':
    # clear_collection(fs_client, "mothers")
    # clear_collection(fs_client, "babies")
    # clear_collection(fs_client, "milk_entries")

    add_dummy_data(fs_client, "mothers", "./firebase/data/mother_details.json")
    add_dummy_data(fs_client, "babies", "./firebase/data/baby_details.json")
    add_dummy_data(fs_client, "milk_entries", "./firebase/data/bottle_details.json")
```


# Available routes on backend

## Get Mothers/Babies/Milk Entries
Get list of all mothers OR babies OR milk_entries.
- ```/mothers``` or ```/mothers/```
- ```/babies``` or ```/babies/```
- ```/milk_entries``` or ```/milk_entries/```
```
// Example for list of mothers (200)
[
    {
        "first_name": "Felicia",
        "last_name": "Smith",
        "mrn": 0,
        "key": "0000"
    },
    {
        "first_name": "Anna",
        "last_name": "Meyers",
        "mrn": 0,
        "key": "0001"
    }
]
OR 
{}
```

(JSON) (200)  
Returns ```list``` of mother/baby/milk entry objects. ```{}``` if no mothers.

## Get Mother/Baby by MRN, Milk Entry by UID

- ```/mothers?mrn=<mrn>```
- ```/babies?mrn=<mrn>```
- ```/milk_entries?uid=<uid>```

## Get Milk Entries in ascending order of created

- ```/milk_entries?order=ASC```

## Get Mother by first_name/last_name

- ```/mothers?first_name=<first_name>```
- ```/mothers?last_name=<last_name>```

(JSON - 200) Returns ```mother```/```baby```/```milk``` data object.  
(ERROR - 400) ```Mother/Baby/Milk does not exist!```

```
// Example of one mother info return (200)
{
    "first_name": "Felicia",
    "last_name": "Smith",
    "mrn": 0,
    "key": "0000"
}
```

```
// Example of no mother found (400)
Mother MRN <mrn> does not exist!
```

## Add Mother/Baby/Milk Entry
- ```/add_mother```
- ```/add_baby```
- ```/add_milk_entry```

```
// JSON body
{
    "mrn": "0000",
    "first_name": "Anne",
    "last_name": "Blot"
}
OR
{
    "mrn": "0003",
    "first_name": "James",
    "last_name": "Blot",
    "mother_mrn": "0000"
}
OR
{
    "milk_type": "EHA",
    "express_time": <unixtimestamp>,
    "expiration_time": <unixtimestamp>,
    "storage_type": "fresh",
    "storage_location": "fridge",
    "volume_ml": 100,
    "baby_mrn": "0000",
    "extra_notes": "extra notes???????"

    // Added by backend, should not be in the json that frontend sends to backend
    // "uid": "000000"
    // "created_at": 109383901823
    // "mother_mrn": "0000"
}
```

```uid```, ```mother_mrn```, ```created_at``` is added to milk entry objects by backend alongside provided data.

(JSON - 200) Success message.  
(ERROR - 400) ```Mother/Baby/Milk Entry already exists!```

## Delete Mother/Baby/Milk Entry by MRN
- ```/delete_mother?mrn=<mrn>```
- ```/delete_baby?mrn=<mrn>```
- ```/delete_milk_entry?uid=<uid>```

(JSON - 200) Success message.  
(ERROR - 400) ```Mother/Baby/Milk Entry does not exist!```

## Verify (2 modes)
- ```/verify?barcode=<barcode>```  
Accepts any input from scanning any barcode, searches database and returns whether its a mother/baby/milk entry or not found. If milk entry detected, returns the expiry status of milk entry. 

Frontend can use this function to verify and identify the first scanned barcode in verify feed process. Upon return, frontend stores type object the barcode represents.

Parameter: ```barcode```

Returns:  
```200``` - Entries found in db
```404``` - Entries not found in db
```
{
    "collection": <collection_name>,
    "expiration_time": <timestamp>, // Only when milk entry detected
    "expired": <bool> // Only when milk entry detected
}
```

- ```/verify_feed?milk_uid=<milk_uid>&baby_mrn=<baby_mrn>```  
Takes mrn of baby and uid of milk entry. Returns match or not, and expiry status of milk entry.

Frontend should be storing the MRN/UID of milk entry or baby, whichever was scanned first and then using this route.

Parameters: 
- ```milk_uid```
- ```baby_mrn```

Returns:
```200``` - match, not expired
```400``` - entries found in database, (not match) OR (match AND expired)
```404``` - entries not found in database
```
// Match expired/not expired return json
{
    "match": <bool>,
    "expiration_time": <timestamp>,
    "expired": <bool>
}
// No match return json
{
    "match": <bool>,
    "mismatch_baby_name": <baby_name>,
    "milk_owner_baby_name": <baby_name>
}
// No entries found return json
{
    "error": <str>,
}
```
