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
exports.getWeatherHistory = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const getWeatherHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    const chmi = 'https://www.chmi.cz/aktualni-situace/aktualni-stav-pocasi/ceska-republika/stanice/profesionalni-stanice/prehled-stanic/liberec?l=cz';
    yield page.goto(chmi);
    const data = yield page.evaluate(() => {
        var _a, _b, _c;
        const loadedContent = document.querySelector('#loadedcontent');
        const getNthTable = (n) => loadedContent === null || loadedContent === void 0 ? void 0 : loadedContent.querySelector(`table:nth-child(${n})`);
        const getNthTableTextContent = (n) => { var _a, _b; return (_b = (_a = getNthTable(n)) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.textContent; };
        let date;
        let latitude;
        let longitud;
        let altitude;
        const pressure = [];
        let hour;
        const weatherTable = getNthTable(8);
        const weatherRows = Array.from((_a = weatherTable === null || weatherTable === void 0 ? void 0 : weatherTable.firstElementChild) === null || _a === void 0 ? void 0 : _a.children);
        const locationName = (_b = getNthTableTextContent(3)) === null || _b === void 0 ? void 0 : _b.trim();
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
        const pressureRow = (_c = weatherRows
            .map((row) => row.innerText.trim().split('\t'))
            .find(row => row[0] === 'Tlak vzduchu na stanici')) === null || _c === void 0 ? void 0 : _c.slice(1).filter(cell => cell !== '');
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
exports.getWeatherHistory = getWeatherHistory;
