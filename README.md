# spotcity
![infra](https://github.com/spotcity/spotcity/workflows/infra/badge.svg)
![frontend](https://github.com/spotcity/spotcity/workflows/frontend/badge.svg)
![api](https://github.com/spotcity/spotcity/workflows/api/badge.svg)

## prepare for the first launch
1. Create ```.env.secrets``` from [.env.secrets.template](.env.secrets.template)

## local env
```bash
# Start app with live reload for both frontend and api
docker-compose -f docker-compose.local.yml up

# Rebuild on any package changes (npm, pip)
docker-compose -f docker-compose.local.yml up --build --renew-anon-volumes
```
- http://localhost/
- http://localhost/api
- http://localhost/docs & http://localhost/redoc
- http://lb.localhost


## dev env
Create [Personal Access Token](https://github.com/settings/tokens) with scope "repo, write:packages".
```bash
docker login https://ghcr.io -u $github_user
docker-compose -f docker-compose.yml up -d
```
- https://spotcity.n3tdom.com/
- https://spotcity.n3tdom.com/api/
- https://spotcity.n3tdom.com/docs & https://spotcity.n3tdom.com/redoc
- https://lb.spotcity.n3tdom.com/
