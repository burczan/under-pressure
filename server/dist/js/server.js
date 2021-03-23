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
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    const chmi = 'https://www.chmi.cz/aktualni-situace/aktualni-stav-pocasi/ceska-republika/stanice/profesionalni-stanice/prehled-stanic/liberec?l=cz';
    yield page.goto(chmi);
    const data = yield page.evaluate(() => {
        var _a, _b;
        const rows = Array.from((_b = (_a = document
            .querySelector('#loadedcontent > table:nth-child(8)')) === null || _a === void 0 ? void 0 : _a.firstElementChild) === null || _b === void 0 ? void 0 : _b.children);
        const parsedRows = rows.map((row) => {
            return row.innerText
                .trim()
                .split('\t');
        });
        return parsedRows;
    });
    yield browser.close();
    return data;
});
const app = express_1.default();
app.use(cors_1.default());
app.get('/data', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getData();
    res.send(data);
}));
app.listen(4000, () => {
    console.log(`Running on port 4000.`);
});
