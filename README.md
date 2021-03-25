# under-pressure

Display pressure values from last 4 hours for Liberec station and warn if change can be dangerous.

(Source: [Český hydrometeorologický ústav](https://www.chmi.cz/)).

## Setup

### Run both server and client

```sh
# from root folder
$ npm run start
```

- Server: http://localhost:4000/weather_history
- Client: http://localhost:3000/

### Run server only

```sh
$ cd server/

# Before first use run:
$ npm run build

$ npm run start
```

### Run server with mocked data

```sh
$ cd server/
$ npm run mocked-server
```

- http://localhost:4000/weather_history

### Run client only

```sh
$ cd client/
$ npm run start
```

## Dev

To add new npm package to project package (`/packages/{client|server}`)

```sh
$ lerna add <npm-package> packages/{client|server}
```

## Technologies used

- [typescript](https://www.typescriptlang.org/)
- [react](https://reactjs.org/)
- [express](https://expressjs.com/)
- [puppeteer](https://developers.google.com/web/tools/puppeteer)
- [bulma](https://bulma.io/)
- [lerna](https://lerna.js.org/)
