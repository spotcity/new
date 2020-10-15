# spotcity
![infra](https://github.com/spotcity/spotcity/workflows/infra/badge.svg)
![frontend](https://github.com/spotcity/spotcity/workflows/frontend/badge.svg)
![api](https://github.com/spotcity/spotcity/workflows/api/badge.svg)


## dev env
- https://spotcity.n3tdom.com/
- https://spotcity.n3tdom.com/api/spots/handshake/
- https://lb.spotcity.n3tdom.com/


## local env
- localhost
- localhost/api
- localhost:8080


### Quick start
1. Create [Personal Access Token](https://github.com/settings/tokens) with scope "repo, write:packages".
2. Login
```bash
docker login https://ghcr.io -u $github_user
```
3. Run
```bash
docker-compose -f docker-compose.dev.yml up -d
```
