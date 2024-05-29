# store

This is the code for our online store. This is a simple store for buying and selling humanoid robots.

## Development

To develop the application, start React and FastAPI in separate terminals:

### React

To install the React dependencies, use [nvm](https://github.com/nvm-sh/nvm) and [npm](https://www.npmjs.com/):

```bash
cd frontend
nvm use 20.10.0
npm install
```

To serve the React frontend in development mode:

```bash
npm start
```

To build the React frontend for production:

```bash
npm run build
```

To automatically rebuild the React frontend code when a file is changed:

```bash
npm run watch
```

To run code formatting:

```bash
npm run format
```

### FastAPI

Create a Python virtual environment using either [uv](https://astral.sh/blog/uv) or [virtualenv](https://virtualenv.pypa.io/en/latest/) with at least Python 3.11. This should look something like this:

```bash
uv venv .venv --python 3.11  # If using uv
python -m venv .venv  # Using vanilla virtualenv
source .venv/bin/activate
```

Install the project:

```bash
uv pip install -e '.[dev]'  # If using uv
pip install -e '.[dev]'  # Using vanilla pip
```

Serve the FastAPI application in development mode:

```bash
fastapi dev 'store/app/main.py' --port 8080  # On port 8080 to avoid conflicts with Docker
```

> [!NOTE]
> You will need to run `npm run build` at least once in order to generate the static files in `frontend/build/static`.

#### Configuration

Settings for the app backend live in the `store/settings/` directory. You can use the following environment variables:

- `ROBOLIST_ENVIRONMENT_SECRETS` should be the path to a local `.env` file containing any environment secrets
- `ROBOLIST_ENVIRONMENT` is the stem of one of the config files in the `store/settings/configs/` directory. When developing locally this should usually just be `local`

To locally develop, setting the following environment variables will work (presuming you have set everything else up):

```
export ROBOLIST_ENVIRONMENT=local
export ROBOLIST_ENVIRONMENT_SECRETS=.env
export AWS_DEFAULT_REGION='us-east-1'
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_ENDPOINT_URL_DYNAMODB=http://127.0.0.1:8000
```

#### Database

When developing locally, use the `amazon/dynamodb-local` Docker image to run a local instance of DynamoDB:

```bash
docker pull amazon/dynamodb-local  # If you haven't already
docker run -d -p 8000:8000 amazon/dynamodb-local  # Start the container in the background
```

Initialize the test databases by running the creation script:

```bash
python -m store.app.api.db
```

### Miscellaneous

#### DynamoDB Admin

DynamoDB Admin is a GUI that allows you to visually see your tables and their entries. To install, run

```bash
npm i -g dynamodb-admin
```

To run, **source the same environment variables that you use for FastAPI** and then run

```bash
dynamodb-admin
```
