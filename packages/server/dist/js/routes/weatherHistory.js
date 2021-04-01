"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weatherHistory_1 = require("../controllers/weatherHistory");
const router = express_1.Router();
router.get('/weather_history', weatherHistory_1.getWeatherHistory);
exports.default = router;
