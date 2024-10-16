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

# Available routes on backend

## Get Mother/s
Get list of all mothers OR get a specific mother by MRN.
- ```/mothers```
- ```/mothers/```

(JSON) (200) Returns ```list``` of mothers. ```{}``` if no mothers.

- ```/mothers/<mrn>```

(JSON - 200) Returns ```dict``` of the mother.  
(ERROR - 400) ```"Mother MRN not found!"```

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
Mother MRN not found!
```
