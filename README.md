# capstone-project-2024-t3-3900h15bcatdevs

### Development - Running the backend (in backend)
Sync/install all dependencies for the ```/backend```:
```
pip install -r requirements.txt
```

Run ```python app.py``` in ```/backend```.

### Development - Running the frontend (in frontend)
This project is using node 16. Using ```nvm``` is highly recommended.

Install node 16:
```nvm install 16```

Use node 16 (should be automatic if just installed):
```nvm use 16```

Sync/install all dependencies for the ```/frontend```:
```
npm i
```
or
```
npm install
```

Run ```npm start``` in ```/frontend```.

### Development - Running both frontend and backend (in root)

Run ```npm run start-both``` in ```/root```.


# Docker Containerising

When we add dependencies to either frontend or backend, please add to ```requirements.txt``` or ```package.json``` respectively. We will need to rebuild the docker image after adding dependencies.

Build the docker image:
```
docker compose build
```

Run the container:
```
docker compose up
```
Run the db container:
```
docker compose up -d
```
