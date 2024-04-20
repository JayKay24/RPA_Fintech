import puppeteer from 'puppeteer';
import config from './config.js';

async function main() {
  const page = await getConfiguredPage();

  await page.goto(config.BASE_URL, { waitUntil: 'load' });

  const modalBtn = await page.$('.noticeClose .btnClose');
  await modalBtn.click();

  const loginBtn = await page.$('.headerBtn .btnLogin');

  await clickAndWaitForNavigationToPage(page, loginBtn);

  await loginToSite(page);

  await waitForLoadingToDissapear('.loadingWrap', page);

  await page.screenshot({ path: 'screenshot_after_login.png', fullPage: true });

  const issuanceBuildingLedger = await page.$('.bldreDiv.bldre1 a');

  await clickAndWaitForNavigationToPage(page, issuanceBuildingLedger);

  // await waitForLoadingToDissapear('.loadingWrap', page);

  await page.screenshot({ path: 'screenshot_issuance.png', fullPage: true });

  const searchByAddressNoBtn = await page.$('.AddrSearch .btnLotNum');
  console.log('search by address here!!', searchByAddressNoBtn);
  await searchByAddressNoBtn.click();

  // const buildingLocation = await page.$('.searchBuilding .multiselect__input');
  // await buildingLocation.type(config.BUILDING_LOCATION, { delay: config.TYPING_DELAY });

  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  await browser.close();
}

async function getConfiguredPage() {
  // setup puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultTimeout(config.PAGE_TIMEOUT);

  return page;
}

async function waitForLoadingToDissapear(loadingImgSelector, page) {
  const waitLoadingImg = selector => document.querySelector(selector) === null;

  await page.waitForFunction(waitLoadingImg, { timeout: config.WAITFORFUNCTION_TIMEOUT }, loadingImgSelector);
}

async function clickAndWaitForNavigationToPage(page, element) {
  await Promise.all([
    page.waitForNavigation(),
    element.click()
  ]);
}

async function loginToSite(page) {
  const loginInput = await page.$('#membId');
  const loginPwd = await page.$('#pwd');
  const formLoginBtn = await page.$('.loginWrap .loginForm .btnLogin');

  await loginInput.type(config.LOGIN_ID, { delay: config.TYPING_DELAY });
  await loginPwd.type(config.LOGIN_PASSWORD, { delay: config.TYPING_DELAY });

  await clickAndWaitForNavigationToPage(page, formLoginBtn);
}

main();