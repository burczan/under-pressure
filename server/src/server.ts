import puppeteer from 'puppeteer';
import express from 'express';

const getData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const chmi = 'https://www.chmi.cz/aktualni-situace/aktualni-stav-pocasi/ceska-republika/stanice/profesionalni-stanice/prehled-stanic/liberec?l=cz';
  await page.goto(chmi);

  const data: string[][] = await page.evaluate(() => {
    const rows = Array.from(document
      .querySelector('#loadedcontent > table:nth-child(8)')
      ?.firstElementChild
      ?.children as HTMLCollection)

    const parsedRows = rows.map((row) => {
      return (row as HTMLElement).innerText
        .trim()
        .split('\t')
    })
    return parsedRows;
  });
  
  await browser.close();
  return data;
};

const app = express();

app.get('/data', async (_req, res) => {
  const data = await getData();
  res.send(data);
})

app.listen(4000, () => {
  console.log(`Running on port 4000.`);
});