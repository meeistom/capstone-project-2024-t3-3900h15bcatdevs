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
    "uid": "0000",
    "milk_type": "EHA",
    "express_time": "NOW",
    "expiration_time": "NOT IMPLEMENTED YET",
    "storage_type": "fresh",
    "storage_location": "fridge",
    "volume_ml": 100,
    "owner_mrn": "0000",
    "extra_notes": "extra notes???????"
}
```
(JSON - 200) Success message.  
(ERROR - 400) ```Mother/Baby/Milk Entry already exists!```

## Delete Mother/Baby/Milk Entry by MRN
- ```/delete_mother?mrn=<mrn>```
- ```/delete_baby?mrn=<mrn>```
- ```/delete_milk_entry?uid=<uid>```

(JSON - 200) Success message.  
(ERROR - 400) ```Mother/Baby/Milk Entry does not exist!```

