import puppeteer from 'puppeteer';
import config from './config.js';

async function main() {
  const [browser, page] = await getConfiguredPage();

  await page.goto(config.BASE_URL, { waitUntil: 'load' });

  const loginBtn = await page.$('.headerBtn .btnLogin');
  if (!loginBtn) quitProgramWithErrorMessage('login button not found');

  await loginToSite(page);

  await clickAndWaitForNavigationToPage(page, null, false, '.registerUi .bldreDiv.bldre1 p');

  const searchByAddressNoBtn = await page.$('.AddrSearch .btnLotNum');
  if (!searchByAddressNoBtn) quitProgramWithErrorMessage('search by address number button not found');
  await searchByAddressNoBtn.click();

  await page.screenshot({ path: 'screenshot.jpeg', fullPage: true, quality: 100 });

  await browser.close();
}

async function getConfiguredPage() {
  // setup puppeteer
  const browser = await puppeteer.launch({ ...config.BROWSER_OPTIONS });
  const page = await browser.newPage();
  page.setDefaultTimeout(config.PAGE_TIMEOUT);

  page.on('dialog', async (dialog) => {
    console.log(dialog.message());
    await dialog.dismiss();
  });

  return [browser, page];
}

async function waitForLoadingToDissapear(loadingImgSelector, page) {
  const waitLoadingImg = selector => document.querySelector(selector) === null;

  await page.waitForFunction(waitLoadingImg, { timeout: config.WAITFOR_TIMEOUT }, loadingImgSelector);
}

async function clickAndWaitForNavigationToPage(page, element, isInView = true, selector = '') {
  if (isInView) {
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load' }),
        element.click()
      ]);
  
      await waitForLoadingToDissapear('.loadingWrap', page);
    } catch (error) {
      quitProgramWithErrorMessage(error);
    }
  } else {
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load' }),
        page.click(selector)
      ]);

      await waitForLoadingToDissapear('.loadingWrap', page);
    } catch (error) {
      quitProgramWithErrorMessage(error);
    }
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

function quitProgramWithErrorMessage(error) {
  console.error(error);
  process.exit(1);
}

main();