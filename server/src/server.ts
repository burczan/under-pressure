import puppeteer from 'puppeteer';
import express from 'express';
import cors from 'cors';

type Result = {
  location: string | undefined;
  date: string | undefined,
  values: {
    hour: string;
    pressure: number;
    pressureUnit: string;
  }[]
};

type PressureHistory = Result | undefined;

const getPressureHistory = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const chmi = 'https://www.chmi.cz/aktualni-situace/aktualni-stav-pocasi/ceska-republika/stanice/profesionalni-stanice/prehled-stanic/liberec?l=cz';
  await page.goto(chmi);

  const data: PressureHistory = await page.evaluate(() => {
    let location: Result['location'];
    let date: Result['date'];
    let hour: Result['values'][number]['hour'];

    const measurementLocation = document.querySelector('#loadedcontent > table:nth-child(3)')?.firstElementChild?.textContent as Result['location'];
    const measurementDate = document.querySelector('#loadedcontent > table:nth-child(4)')?.firstElementChild?.textContent as Result['date'];
    const weatherTable = document.querySelector('#loadedcontent > table:nth-child(8)');

    if (measurementLocation) {
      location = measurementLocation.trim();
    }

    if (measurementDate) {
      const [day, month, year, time, ..._rest] = measurementDate.trim().split(' ');
      const [h, _min] = time.split(':');
      hour = h;
      date = new Date(
        Number(year),
        Number(month.replace('.', '')) - 1,
        Number(day.replace('.', ''))
      ).toDateString() as string
    }

    const rows = Array.from(weatherTable?.firstElementChild?.children as HTMLCollection)

    const pressureRow: string[] | undefined = rows
      .map((row) => (row as HTMLElement).innerText.trim().split('\t'))
      .find(row => row[0] === 'Tlak vzduchu na stanici')
      ?.slice(1)
      .filter(cell => cell !== '');
    
    if (pressureRow) {
      const values: Result['values'] = [];

      pressureRow.map((cell, i) => {
        const [pressure, unit] = cell.split(' ');

        values.push({
          hour: `${Number(hour) - i}:00`,
          pressure: Number.parseFloat(pressure.replace(',', '.')),
          pressureUnit: unit,
        })
      })

      return {
        location,
        date,
        values,
      };
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
