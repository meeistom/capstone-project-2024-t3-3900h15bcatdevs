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
