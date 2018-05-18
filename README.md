# OpenCollective Mobile app

[![Greenkeeper badge](https://badges.greenkeeper.io/opencollective/opencollective-app.svg)](https://greenkeeper.io/)

[![Circle CI](https://circleci.com/gh/OpenCollective/opencollective-app/tree/master.svg?style=shield)](https://circleci.com/gh/OpenCollective/opencollective-app/tree/master)
[![Slack Status](https://slack.opencollective.com/badge.svg)](https://slack.opencollective.com)
[![Gitter chat](https://badges.gitter.im/OpenCollective/OpenCollective.svg)](https://gitter.im/OpenCollective/OpenCollective)
[![Dependency Status](https://david-dm.org/opencollective/opencollective-website.svg)](https://david-dm.org/opencollective/opencollective-app)

## Setup

```
npm install
```

## Run in dev

```
npm install foreman -g
npm run dev
```

## Build for production

```
npm run build
```

## Deployment

If you want to deploy to staging, you need to push your code to the `staging` branch. CircleCI will run the tests on this branch and push to Heroku for you if successful.

### Manually

```
npm run deploy:staging
npm run deploy:production
```

The script will merge `origin/master` to the branch `staging` or `production` branch. Push it to GitHub and Heroku.

## Test

See [Wiki](https://github.com/OpenCollective/OpenCollective/wiki/Software-testing).

## Stack

- https://github.com/rackt/redux
- https://facebook.github.io/react/
