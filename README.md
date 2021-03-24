# under-pressure

Display pressure values from last 4 hours for Liberec station (source: [Český hydrometeorologický ústav](https://www.chmi.cz/)).

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

### Run client only

```sh
$ cd client/
$ npm run start
```

## Technologies used

- [react](https://reactjs.org/)
- [express](https://expressjs.com/)
- [puppeteer](https://developers.google.com/web/tools/puppeteer)
- [bulma](https://bulma.io/)
- [lerna](https://lerna.js.org/)
