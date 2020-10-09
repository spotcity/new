# back

## Quick start
```bash
docker build -t back:latest .

# run with code reload
docker run -p=5000:5000 -v "$PWD":/app --rm --name spotcity_back back:latest

# run standalone
docker run -p=5000:5000 --rm --name spotcity_back back:latest

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
