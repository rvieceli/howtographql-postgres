# Backend using GraphQl + prisma

> from hackernews-graphql-js

This repository contains the final project for the [**GraphQL.js tutorial**](https://www.howtographql.com/graphql-js/0-introduction/) on [How to GraphQL](https://www.howtographql.com/). Note that it also serves as foundation for all frontend tutorials on the site.

> I removed prisma layer, and implemented directly using postgres and redis to subscriptions. The cache is missing, but I'll go implement in the future.

## Usage

### 1. Clone repository & install dependencies

```sh
git clone https://github.com/rvieceli/howtographql-postgres
cd howtographql-postgres
yarn install # or `npm install`
```

> I recommend use YARN

### 2. Install the Prisma CLI

No! you don't need this layer

### 3. Deploy Prisma and database

No!

### 4. Start the server & open Playground

To interact with the API in a GraphQL Playground, all you need to do is execute the `start` script defined in `package.json`:

> You need to provide the Postgres and Redis connections

> To help you, I forgot to put my local .env configuration file in the .gitignore file.

> Connection is OK? you need to run postgres migrations to create the tables

```sh
yarn sequelize db:migrate
```

> Let's get start

```sh
yarn start
```
