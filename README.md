# FOM Load Testing

This project uses k6 for load testing. Below are the steps to set up and run the tests.

## Install & Config

```sh
pnpm i
cp .env.template .env
```

### Host only

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
   k6 cloud login --token <TOKEN>
   ```

2. Run test
   ```sh
   k6 cloud src/test.js
   ```