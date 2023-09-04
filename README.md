# Awards Backend Service

## Prerequisites

- Docker (min. version `24.0.5`)
- NodeJS runtime (min. version `18.16.0`)

## Installation

Run the following command to install the required dependencies

```bash
yarn install # or just `yarn`
```

## Run the dependency service

This project requires MongoDB to be running, execute the following command in order to do so

```bash
docker-compose up -d mongodb
```

Do some gradual checks to make sure that MongoDB is ready to seed by invoking the following command

```bash
docker-compose ps

# The following is example of ready-to-use MongoDB container
NAME                       IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
awards-backend-mongodb-1   mongo:6.0.6         "docker-entrypoint.s…"   mongodb             25 minutes ago      Up 25 minutes       0.0.0.0:27017->27017/tcp
```

After that, we need to seed the database using the following command

```bash
docker-compose up mongoseed
```

Once all the above steps are done, you're good to run the app

```bash
npm run start:dev
```
