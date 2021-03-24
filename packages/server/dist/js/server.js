"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const getWeatherHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    const chmi = 'https://www.chmi.cz/aktualni-situace/aktualni-stav-pocasi/ceska-republika/stanice/profesionalni-stanice/prehled-stanic/liberec?l=cz';
    yield page.goto(chmi);
    const data = yield page.evaluate(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        let date;
        let latitude;
        let longitud;
        let altitude;
        const pressure = [];
        let hour;
        const locationName = (_c = (_b = (_a = document.querySelector('#loadedcontent > table:nth-child(3)')) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim();
        const measurementDate = (_e = (_d = document.querySelector('#loadedcontent > table:nth-child(4)')) === null || _d === void 0 ? void 0 : _d.firstElementChild) === null || _e === void 0 ? void 0 : _e.textContent;
        const measurementLocationDetails = (_g = (_f = document.querySelector('#loadedcontent > table:nth-child(5)')) === null || _f === void 0 ? void 0 : _f.firstElementChild) === null || _g === void 0 ? void 0 : _g.textContent;
        const weatherTable = document.querySelector('#loadedcontent > table:nth-child(8)');
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
        const rows = Array.from((_h = weatherTable === null || weatherTable === void 0 ? void 0 : weatherTable.firstElementChild) === null || _h === void 0 ? void 0 : _h.children);
        const pressureRow = (_j = rows
            .map((row) => row.innerText.trim().split('\t'))
            .find(row => row[0] === 'Tlak vzduchu na stanici')) === null || _j === void 0 ? void 0 : _j.slice(1).filter(cell => cell !== '');
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
    yield browser.close();
    return data;
});
const app = express_1.default();
app.use(cors_1.default());
app.get('/data', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getWeatherHistory();
    res.send(data);
}));
app.listen(4000, () => {
    console.log(`Running on port 4000.`);
});
