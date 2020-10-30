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
yum update -y; yum install -y nano git socat httpd-tools epel-release yum-utils
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum install -y docker-ce docker-ce-cli containerd.io
systemctl start docker && systemctl enable docker
curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

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
