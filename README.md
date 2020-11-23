# spotcity
Micro-community app based around points of interest in the city

![infra](https://github.com/spotcity/spotcity/workflows/infra/badge.svg)
![frontend](https://github.com/spotcity/spotcity/workflows/frontend/badge.svg)
![api](https://github.com/spotcity/spotcity/workflows/api/badge.svg)

## local env
1. Create ```.env.secrets``` from [.env.secrets.template](.env.secrets.template)
2. ```./local.sh --start```     # Start app with live reload for both frontend and api
3. Check out URL's
   - http://localhost/
   - http://localhost/api
   - http://localhost/docs & http://localhost/redoc
   - http://lb.localhost


```./local.sh --recreate```  # Rebuild and start. Useful when npm/pip packages are changed


## dev env
- Create [Personal Access Token](https://github.com/settings/tokens) with scope "repo, write:packages".
- Secrets are filled via Github Actions workflow

```bash
docker login https://ghcr.io -u $github_user
docker-compose -f docker-compose.yml up -d
```
