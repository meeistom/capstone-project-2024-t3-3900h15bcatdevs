# USING THE BACKEND (for frontend peeps)

Uncomment the database clearing lines in app.py to clear the database or one collection at a time.
```
if __name__ == '__main__':
    #### UNCOMMENT FOR DB CONTROL
    #### WARNING: DESTRUCTIVE STUFF
    # clear_mothers(fs_client)
    # clear_babies(fs_client)
    # clear_milk_entries(fs_client)
    # clear_all_collections(fs_client)

    app.run(host='0.0.0.0', port=5001, debug=True)
```

Might be a section on pre-made collections in the future?

> ❗️ Info on Data
>
> For information on data objects. See ```firebase/firestore-data.md```

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
    "expiration_date": "NOT IMPLEMENTED YET",
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

