import { Router } from 'express';
import { getWeatherHistory } from '../controllers/weatherHistory';

const router = Router();

router.get('/weather_history', getWeatherHistory);

export default router;
