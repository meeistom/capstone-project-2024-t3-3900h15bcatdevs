# capstone-project-2024-t3-3900h15bcatdevs

## Running with Docker (main method)

When we add dependencies to either frontend or backend, please add to `requirements.txt` or `package.json` respectively. We will need to rebuild the docker image after adding dependencies.

Build the docker image:

```
docker compose build
```

Run the containers:

```
docker compose up -d 
```

if you make changes to the code, then run docker compose down, then docker compose build, then docker compose up


### Development - Running the backend (in backend)

Sync/install all dependencies for the `/backend`:

```
pip install -r requirements.txt
```

Move your key from `backend/firebase` to `/backend/.key`.  
Rename YOUR key to just `key.json`.

To have access to the database, please make sure you have your `key_<catdev-name>.json` file in `/backend/firebase`, and uncomment the appropriate line to direct to the right key. Find your key in resources in discord.

`.gitignore` is set to ignore files starting with `key_*`.

Run `python app.py` in `/backend`.

### Development - Running the frontend (in frontend)

This project is using node 16. Using `nvm` is highly recommended.

Install node 16:
`nvm install 16`

Use node 16 (should be automatic if just installed):
`nvm use 16`

Sync/install all dependencies for the `/frontend`:

```
npm i
```

or

```
npm install
```

Run `npm start` in `/frontend`.

### Development - Running both frontend and backend (in root)

Run `npm run start-both` in `/root`.

# Testing

## Frontend

Please run tests when working on the frontend. Please update tests if needed.

### Cypress (User Flows)

To run cypress:

```
npm run cy:open
```

Ensure that backend is also running. Run cypress in Chrome only.

### Component Testing

To run component tests:

```
npm run test
```

You may encounter test failures due to mismatched snapshots. If the component design has been changed, enter `u` in watch mode.
