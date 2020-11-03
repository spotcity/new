# spotcity
Micro-community app based around points of interest in the city

![infra](https://github.com/spotcity/spotcity/workflows/infra/badge.svg)
![frontend](https://github.com/spotcity/spotcity/workflows/frontend/badge.svg)
![api](https://github.com/spotcity/spotcity/workflows/api/badge.svg)

## local env
Create ```.env.secrets``` from [.env.secrets.template](.env.secrets.template)

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
- Create [Personal Access Token](https://github.com/settings/tokens) with scope "repo, write:packages".
- Secrets are filled via Github Actions workflow

```bash
docker login https://ghcr.io -u $github_user
docker-compose -f docker-compose.yml up -d
```
