# capstone-project-2024-t3-3900h15bcatdevs

### Development - Running the backend
Sync/install all dependencies for the ```/backend```:
```
pip install -r requirements.txt
```

Run ```python app.py``` in ```/backend```.

### Development - Running the frontend

- Bruh


# Docker Containerising
This is only when we want to submit or give our code to someone else to run. 

When we add dependencies to either frontend or backend, please add to ```requirements.txt``` or ```package.json``` respectively. We will need to rebuild the docker image after adding dependencies.

Build the docker image:
```
docker compose build
```

Run the container:
```
docker compose up
```