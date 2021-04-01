import express from 'express';
import cors from 'cors';
import weatherHistoryRoutes from './routes/weatherHistory.js';

const app = express();

app.use(cors());

app.use(weatherHistoryRoutes);

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('Running on port 4000.');
});
