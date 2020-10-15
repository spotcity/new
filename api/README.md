# api

## Quick start
```bash
docker build -t spotcity/api:latest .

# run with code reload
docker run -p=5000:5000 -v "$PWD":/app --rm --name spotcity_api spotcity/api:latest

# run standalone
docker run -d -p=5000:5000 --rm --name spotcity_api spotcity/api:latest

# gunicorn cmd
gunicorn --bind 0.0.0.0:5000 app:app

```

## Shell launch
```bash
python3 -m venv python3
. python3/bin/activate
pip install -r requirements.txt

# run dev
python3 app.py

# run prod
export APP_ENV=ProductionConfig
python3 app.py

```
