#!/bin/bash
set -euo pipefail
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

app_start()
{
  docker-compose -f docker-compose.local.yml up
}

app_recreate()
{
  docker-compose -f docker-compose.local.yml --env-file=.env.local up --build --renew-anon-volumes
}

help_menu() {
  cat << EOF
  Usage:
  ./sync.sh --help
  ./local.sh --start    # Start with live reload for both frontend and api
  ./local.sh --recreate # Rebuild and start. Useful when npm/pip packages are changed
EOF
}

while [[ $# > 0 ]]
do
case "${1}" in
  --start)
  app_recreate
  shift
  ;;
  --recreate)
  app_recreate
  shift
  ;;
  -h|--help)
  help_menu
  shift
  ;;
  *)
  echo "${1} is not a valid flag, try running: ${0} --help"
  exit 1
  ;;
esac
shift
done
