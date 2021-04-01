"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherHistory = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const fetchWeatherHistory = async () => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    // eslint-disable-next-line max-len
    const chmi = 'https://www.chmi.cz/aktualni-situace/aktualni-stav-pocasi/ceska-republika/stanice/profesionalni-stanice/prehled-stanic/liberec?l=cz';
    await page.goto(chmi);
    const data = await page.evaluate(() => {
        const loadedContent = document.querySelector('#loadedcontent');
        const getNthTable = (n) => loadedContent?.querySelector(`table:nth-child(${n})`);
        const getNthTableTextContent = (n) => getNthTable(n)?.firstElementChild?.textContent;
        let date;
        let latitude;
        let longitud;
        let altitude;
        const pressure = [];
        let hour;
        const weatherTable = getNthTable(8);
        const weatherRows = Array.from(weatherTable?.firstElementChild?.children);
        const locationName = getNthTableTextContent(3)?.trim();
        const measurementDate = getNthTableTextContent(4);
        const measurementLocationDetails = getNthTableTextContent(5);
        if (measurementDate) {
            const [day, month, year, time, ..._rest] = measurementDate.trim().split(' ');
            const [h, _min] = time.split(':');
            hour = h;
            date = new Date(Number(year), Number(month.replace('.', '')) - 1, Number(day.replace('.', ''))).toDateString();
        }
        if (measurementLocationDetails) {
            const [lat, lon, alt] = measurementLocationDetails.trim().split('     ');
            latitude = lat.split(' ')[0].replace('°', '');
            longitud = lon.split(' ')[0].replace('°', '');
            altitude = alt;
        }
        const pressureRow = weatherRows
            .map((row) => row.innerText.trim().split('\t'))
            .find((row) => row[0] === 'Tlak vzduchu na stanici')
            ?.slice(1)
            .filter((cell) => cell !== '');
        if (pressureRow) {
            pressureRow.map((cell, i) => {
                const [value, unit] = cell.split(' ');
                pressure.push({
                    hour: `${Number(hour) - i}:00`,
                    value: Number.parseFloat(value.replace(',', '.')),
                    unit,
                });
            });
        }
        return {
            location: {
                name: locationName,
                latitude,
                longitud,
                altitude,
            },
            date,
            pressure,
        };
    });
    await browser.close();
    return data;
};
const getWeatherHistory = async (_req, res, _next) => {
    const data = await fetchWeatherHistory();
    res.send(data);
};
exports.getWeatherHistory = getWeatherHistory;
