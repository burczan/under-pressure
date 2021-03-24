import puppeteer from 'puppeteer';
import express from 'express';
import cors from 'cors';

type Result = {
  date: string | undefined,
  location: {
    name: string | undefined;
    latitude: string | undefined;
    longitud: string | undefined;
    altitude: string | undefined;
  };
  pressure: {
    hour: string;
    value: number;
    unit: string;
  }[]
};

type PressureHistory = Result;

const getWeatherHistory = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const chmi = 'https://www.chmi.cz/aktualni-situace/aktualni-stav-pocasi/ceska-republika/stanice/profesionalni-stanice/prehled-stanic/liberec?l=cz';
  await page.goto(chmi);

  const data: PressureHistory = await page.evaluate(() => {
    let date: Result['date'];
    let latitude: Result['location']['latitude'];
    let longitud: Result['location']['longitud'];
    let altitude: Result['location']['altitude'];
    const pressure: Result['pressure'] = [];
    let hour: Result['pressure'][number]['hour'];

    const locationName = document.querySelector('#loadedcontent > table:nth-child(3)')?.firstElementChild?.textContent?.trim() as Result['location']['name'];
    const measurementDate = document.querySelector('#loadedcontent > table:nth-child(4)')?.firstElementChild?.textContent as Result['date'];
    const measurementLocationDetails = document.querySelector('#loadedcontent > table:nth-child(5)')?.firstElementChild?.textContent;
    const weatherTable = document.querySelector('#loadedcontent > table:nth-child(8)');


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

    if (measurementLocationDetails) {
      const [lat, lon, alt] = measurementLocationDetails.trim().split('     ');
      latitude = lat.split(' ')[0].replace('°', '');
      longitud = lon.split(' ')[0].replace('°', '');
      altitude = alt;
    }

    const rows = Array.from(weatherTable?.firstElementChild?.children as HTMLCollection)

    const pressureRow: string[] | undefined = rows
      .map((row) => (row as HTMLElement).innerText.trim().split('\t'))
      .find(row => row[0] === 'Tlak vzduchu na stanici')
      ?.slice(1)
      .filter(cell => cell !== '');
    
    if (pressureRow) {
      pressureRow.map((cell, i) => {
        const [value, unit] = cell.split(' ');

        pressure.push({
          hour: `${Number(hour) - i}:00`,
          value: Number.parseFloat(value.replace(',', '.')),
          unit,
        })
      })
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

const app = express();
app.use(cors());

app.get('/data', async (_req, res) => {
  const data = await getWeatherHistory();
  res.send(data);
})

app.listen(4000, () => {
  console.log(`Running on port 4000.`);
});
