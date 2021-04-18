# accelerex Backend

## Getting Started

## Note

At least Node.js version `14` is required for the project. You may use [Fast Node Manager](https://github.com/Schniz/fnm) or [Node Version Manager](https://github.com/nvm-sh/nvm) to configure different Node.js versions as needed.

First, install the dependencies:

```bash
npm i
```

Second, create your `.env` file:

```bash
cp .env.example .env
```

Third, set up the infrastructural dependencies with Docker Compose:

```bash
docker-compose up -d
```

Third, run the development server:

```bash
npm run dev
```

## Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Open [http://localhost:4500](http://localhost:4000) in Postman or whatever tool you use to interact with a REST API.

## Learn More

This project was bootstrapped with NestJS framework:

- [NestJS Documentation](https://docs.nestjs.com) - learn about Next.js features and API.
# xcelerex
