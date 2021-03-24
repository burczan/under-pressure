import puppeteer from 'puppeteer';
import express from 'express';
import cors from 'cors';

type PressureHistory = number[] | undefined;

const getPressureHistory = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const chmi = 'https://www.chmi.cz/aktualni-situace/aktualni-stav-pocasi/ceska-republika/stanice/profesionalni-stanice/prehled-stanic/liberec?l=cz';
  await page.goto(chmi);

  const data: PressureHistory = await page.evaluate(() => {
    const pressureTable = document.querySelector('#loadedcontent > table:nth-child(8)');
    const rows = Array.from(pressureTable
      ?.firstElementChild
      ?.children as HTMLCollection)

    const pressureRow: string[] | undefined = rows
      .map((row) => (row as HTMLElement).innerText.trim().split('\t'))
      .find(row => row[0] === 'Tlak vzduchu na stanici');
    
    if (pressureRow) {
      const result = pressureRow.filter(el => el !== '');
      const [_title, ...stringValues] = result;
      const numberValues = stringValues
        .map(value => value.split(' '))
        .map(value => {
          const [val, _unit] = value;
          return Number.parseFloat(val.replace(',', '.'));
        });
      return [...numberValues];
    }

    return undefined;
  });
  
  await browser.close();
  return data;
};

const app = express();
app.use(cors());

app.get('/data', async (_req, res) => {
  const data = await getPressureHistory();
  res.send(data);
})

app.listen(4000, () => {
  console.log(`Running on port 4000.`);
});