# Overview
- Setup digitalocean droplet via Terraform + Ansible
- Github Actions as CI/CD
  - push to dev = update latest img, deploy dev env
  - push tag = update tag img, deploy prod env
- Monitoring
  - prom + grafana (https://landing.google.com/sre/sre-book/chapters/monitoring-distributed-systems/)
  - kafka + elk (as proof of integration)
  - sentry?
- Proxy/Review branches
  - traefik (envoy?)


# TODO: DEBT

## github-actions
- stop using third-party ssh-action
- ssh login as non-root user

## host config:
```bash
yum update
install common-tools
install docker + docker compose
# login with token
docker login https://ghcr.io -u $user --password-stdin

# unused
install github runner
  https://github.com/organizations/spotcity/settings/actions/add-new-runner
  useradd github-runner
  su github-runner ./config.sh (silent?)
  exit
  ./svc.sh install github-runner
  systemctl start + enable OR ./svc.sh status ./svc.sh start
```
