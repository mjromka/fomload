# FOM Load Testing

This project uses k6 for load testing. Below are the steps to set up and run the tests.

## Install & Config

```sh
pnpm i
cp .env.template .env
```

### Host only

Generate links using separate (Meeting Links Generation)[https://github.com/timkishkin/meeting-links-generation]
TODO: incorporate the logic into this project and create a task to generate links and save them in links.txt

Wipe old data and push actual links to Redis

```sh
pnpm refresh
```

## Run locally

```sh
pnpm test
```

## Run in Cloud

1. Log in to k6 cloud:

   ```sh
   k6 cloud login --token $(grep K6_CLOUD_TOKEN .env | cut -d '=' -f2)
   ```

2. Run test
   ```sh
   k6 cloud src/test.js
   ```