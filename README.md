# spotcity
![infra](https://github.com/spotcity/spotcity/workflows/infra/badge.svg)
![frontend](https://github.com/spotcity/spotcity/workflows/frontend/badge.svg)
![api](https://github.com/spotcity/spotcity/workflows/api/badge.svg)

## local env (WIP)
```bash
docker-compose -f docker-compose.local.yml up -d
```
- http://localhost/
- http://localhost/api
- http://localhost/docs
- http://localhost/traefik


## dev env
Create [Personal Access Token](https://github.com/settings/tokens) with scope "repo, write:packages".
```bash
docker login https://ghcr.io -u $github_user
docker-compose -f docker-compose.yml up -d
```
- https://spotcity.n3tdom.com/
- https://spotcity.n3tdom.com/api/spots/handshake/
- https://lb.spotcity.n3tdom.com/
