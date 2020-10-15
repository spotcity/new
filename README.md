# spotcity
![infra](https://github.com/spotcity/spotcity/workflows/infra/badge.svg)
![frontend](https://github.com/spotcity/spotcity/workflows/frontend/badge.svg)
![api](https://github.com/spotcity/spotcity/workflows/api/badge.svg)


## dev environment
- https://spotcity.n3tdom.com/
- https://spotcity.n3tdom.com/api/spots/handshake/
- https://lb.spotcity.n3tdom.com/


## local environment:
- localhost
- localhost/api
- localhost:8080

```bash
# 1. Create Personal Access Token https://github.com/settings/tokens
# 2. Login
docker login https://ghcr.io -u $github_user
# 3. Run
docker-compose -f docker-compose.dev.yml up -d

```
