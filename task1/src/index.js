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

  await clickAndWaitForNavigationToPage(page, null, false, '.registerUi .bldreDiv.bldre1 p');

  await waitForLoadingToDissapear('.loadingWrap', page);

  const searchByAddressNoBtn = await page.$('.AddrSearch .btnLotNum');
  await searchByAddressNoBtn.click();

  await browser.close();
}

async function getConfiguredPage() {
  // setup puppeteer
  const browser = await puppeteer.launch({ ...config.BROWSER_OPTIONS });
  const page = await browser.newPage();
  page.setDefaultTimeout(config.PAGE_TIMEOUT);

  return page;
}

async function waitForLoadingToDissapear(loadingImgSelector, page) {
  const waitLoadingImg = selector => document.querySelector(selector) === null;

  await page.waitForFunction(waitLoadingImg, { timeout: config.WAITFORFUNCTION_TIMEOUT }, loadingImgSelector);
}

async function clickAndWaitForNavigationToPage(page, element, isInView = true, selector = '') {
  if (isInView) {
    await Promise.all([
      page.waitForNavigation(),
      element.click()
    ]);
  } else {
    await Promise.all([
      page.waitForNavigation(),
      page.click(selector)
    ]);
  }
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