# capstone-project-2024-t3-3900h15bcatdevs

# Running with Docker (main method)

Docker runs the frontend and the backend. It installs all the frontend and backend dependencies and works with hot reload.

When NEW dependencies are added to either frontend or backend, please add to `requirements.txt` or `package.json` respectively. We will need to rebuild the docker image after adding dependencies.

Build the docker image:

```
docker compose build
```

Run the containers:

```
docker compose up -d / docker compose up
```

Stop the containers:

```
docker compose down
```

Hot reload now works so if any changes are made to the code just refresh the page (no need to rebuild everytime)

If on Windows, additional setup for hot reload is involved to set up readability from Docker to the assigned volume directories

1. Ensure your docker containers are not running (docker compose down)
2. On Docker Desktop go to "Settings > Resources > File Sharing" then add the directory of your local repository in this location:

![docker](/docker.png)

3. Click "Apply & restart" to update the changes.
4. Go to the "frontend" directory and apply "chmod 777" on the "node_modules" file
5. Close Docker Desktop completely
6. Run Docker Desktop as administrator
7. Run the containers
8. Hot reload will work now!

# Development

## Running the Backend

You can run the backend in `/backend`.
Sync/install all dependencies for the `/backend`:

```
pip install -r requirements.txt
```

To have access to the database, please make sure you have your `key.json` file in `/backend/.key`. Find your key in resources in discord and rename it to `key.json`.

`.gitignore` is set to ignore files in `/.key`.

Run `python app.py` in `/backend`.

## Running the Frontend

You can run Frontend in `/frontend`.
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

# Testing

## Frontend

Please run tests when working on the frontend. Please update tests if needed. Run frontend tests in the `./frontend` folder.

### Cypress (User Flows)

Make sure Docker is running.

To run cypress:

```
npm run cy:open
```

Ensure that backend is also running. Run cypress in Chrome only.

Select e2e testing in the popup, and select Chrome.

If a play button appears, clicking it will run all tests.

Else, you can click on the test files individually to run them.

### Component Testing

To run component tests:

```
npm run test
```

You may encounter test failures due to mismatched snapshots. If the component design has been changed, enter `u` in watch mode.

## Backend

Please run tests when working on the backend. Please update tests if needed.

To run tests navigate to the `./backend` folder, then use:

```plain
pytest
```

This will automatically detect Python files with the prefix `test_` and run them.

- To run the `test_labels.py` file you will need to have `wkhtmltopdf` installed in your environment. It is easiest to do this in WSL with the commands:

  ```plain
  sudo apt update
  sudo apt install -y wkhtmltopdf
  ```

You can find the code coverage by running the following.

```plain
pytest --cov
```
