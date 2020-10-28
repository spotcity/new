# frontend

## Quick start using Docker
```bash
# local env (WIP)
docker build -t spotcity/frontend:local .
docker rm -f spotcity_frontend; docker run -p=80:80 -v "$PWD":/app --name spotcity_frontend spotcity/frontend:local

# standalone env
docker rm -f spotcity_frontend; docker run -d -p=80:80 --name spotcity_frontend spotcity/frontend:local

```


------------------------
# Getting started

## Prerequisites:
 1. Install [Node](https://nodejs.org/)
 2. Install dependencies by running `npm i`
 3. For local development, you need to copy `.env.development.local.template` file to `.env.development.local` and modify `DEV_PROXY` environment variable so that it refers to API host (you can declare/override [other environment variables](https://create-react-app.dev/docs/advanced-configuration/) using this file)


## Available commands:

### `npm start`

Runs the app in the development mode on 3001 port by default (can be overridden by setting `PORT` environment variable in `.env.development.local` file).

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run build:analyze`

Builds the app and creates report with bundle size analysis.

### `npm run test`

Run tests.

### `npm run test:watch`

Run tests in watch mode.

### `npm run lint`

Run ESLint check.

### `npm run check-ts`

Run TypeScript check.
