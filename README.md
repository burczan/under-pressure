# under-pressure

Display pressure values from last 4 hours for Liberec station (source: [Český hydrometeorologický ústav](https://www.chmi.cz/)).

## Setup
### Run server

```sh
cd server/
```

Before first use:

```sh
npm run build
```

Start development server:
```sh
npm run start
```

Server is available at http://localhost:4000/data.

### Run client

Start client:
```sh
cd client/
npm run start
```

Client is available at http://localhost:3000/

## Technologies used

- [react](https://reactjs.org/)
- [express](https://expressjs.com/)
- [puppeteer](https://developers.google.com/web/tools/puppeteer)
- [bulma](https://bulma.io/)