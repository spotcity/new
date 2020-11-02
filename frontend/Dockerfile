FROM node:14-alpine as node_modules
WORKDIR /app
COPY package*.json /app/
RUN npm install

FROM node:14-alpine as build
WORKDIR /app
COPY --from=node_modules /app/node_modules /app/node_modules
COPY ./ /app/
RUN npm run build

FROM nginx:1.19-alpine
WORKDIR /app
COPY ./.ci/nginx.conf /etc/nginx/
COPY --from=build /app/build/ /app/

# lazy debug
RUN apk update && apk add bash curl nano

# TEST
#RUN npm run test:unit

# SENTRY
# ARG REACT_APP_SENTRY_DSN
# ENV REACT_APP_SENTRY_DSN=$REACT_APP_SENTRY_DSN

## SELECT BUILD TYPE
#USAGE: docker build -t my_docker . --build-arg build_env=prod
#default argument when not provided in the --build-arg
#ARG build_env="dev"
# dev
#RUN if [ "$build_env" = "dev" ] ; then npm run staging && echo ">> Building dev"; else echo "" ; fi
# prod
#RUN if [ "$build_env" = "prod" ] ; then npm run build && echo ">> Building prod"; else echo "" ; fi
##
