import puppeteer from 'puppeteer';
import blockMediaDownLoad from './blockMediaDownload.js';

const threeMins = 3 * 60 * 1000;
const infinite = 0;

const config = {
  PAGE_TIMEOUT: threeMins,
  WAITFOR_TIMEOUT: threeMins,
  PDF_TIMEOUT_SAVE: 2 * 1000,
  LOGIN_ID: 'ohk5004',
  LOGIN_PASSWORD: 'MufinNumber1',
  // BASE_URL: 'https://cloud.eais.go.kr/',
  BASE_URL: 'https://www.eais.go.kr/moct/awp/abb01/AWPABB01F01?returnUrl=/',
  TYPING_DELAY: 90,
  BUILDING_LOCATION: '경기도 고양시 일산동구 강석로 152 강촌마을아파트 제701동 제2층 제202호 [마두동 796]',
  BROWSER_OPTIONS: { 
    headless: false,
    defaultViewport: null,
    args: ['--start-fullscreen'],
  }
};

async function getConfiguredPage() {
  // setup puppeteer
  const browser = await puppeteer.launch({ ...config.BROWSER_OPTIONS });
  let page = await browser.newPage();
  page.setDefaultTimeout(config.PAGE_TIMEOUT);

  page = await blockMediaDownLoad(page);
  
  page.on('dialog', async (dialog) => {
    console.log(dialog.message());
    await dialog.dismiss();
  });

  return [browser, page];
}

export { config, getConfiguredPage };
