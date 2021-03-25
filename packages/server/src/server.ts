import express from 'express';
import cors from 'cors';
import { getWeatherHistory } from './utility/weatherHistory';

const app = express();

app.use(cors());

app.get('/weather_history', async (_req, res) => {
  const data = await getWeatherHistory();
  res.send(data);
})

app.listen(4000, () => {
  console.log(`Running on port 4000.`);
});
