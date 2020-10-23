# api

## Quick start
```bash
# local env
docker build -t spotcity/api:local .
docker rm -f spotcity_api; docker run -p=8000:8000 -v "$PWD":/app --name spotcity_api spotcity/api:local

# standalone env
docker rm -f spotcity_api; docker run -d -p=8000:8000 --name spotcity_api spotcity/api:local

```

## Shell launch
```bash
python3 -m venv python3
. python3/bin/activate
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --reload
```
