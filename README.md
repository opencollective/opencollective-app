# OpenCollective Mobile app [![Circle CI](https://circleci.com/gh/OpenCollective/opencollective-mobileapp/tree/master.svg?style=svg&circle-token=f96fc77d4d46882a72fff85ad9ce98b8b9f58ca7)](https://circleci.com/gh/OpenCollective/opencollective-mobileapp/tree/master)

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
