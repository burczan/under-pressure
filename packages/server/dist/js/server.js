"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const weatherHistory_1 = __importDefault(require("./routes/weatherHistory"));
const app = express_1.default();
app.use(cors_1.default());
app.use(weatherHistory_1.default);
app.listen(4000, () => {
    // eslint-disable-next-line no-console
    console.log('Running on port 4000.');
});
