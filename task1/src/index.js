import puppeteer, { Target } from 'puppeteer';
import { URL } from 'url';
import config from './config.js';

async function main() {
  const [browser, page] = await getConfiguredPage();

  await page.goto(config.BASE_URL, { waitUntil: 'load' });

  await loginToSite(page);

  await waitForLoadingToDissapear('#nuxt-loading', page);

  await waitForLoadingToDissapear('.loadingWrap', page);

  await page.waitForSelector('.registerUi .bldreDiv.bldre1 p', { timeout: config.WAITFOR_TIMEOUT });

  await clickAndWaitForNavigation(page, null, false, '.registerUi .bldreDiv.bldre1 p');

  await waitForLoadingToDissapear('#nuxt-loading', page);

  await waitForLoadingToDissapear('.loadingWrap', page);

  const searchByAddressNoBtn = await page.waitForSelector('.AddrSearch .btnLotNum', { timeout: config.WAITFOR_TIMEOUT });
  if (!searchByAddressNoBtn) quitProgramWithErrorMessage('search by address number button not found');
  await searchByAddressNoBtn.click();

  await fillInAddressNumberForm(page);

  await waitForLoadingToDissapear('.loadingWrap', page);

  console.log('A'.repeat(7));

  const complaintSelTab = await page.waitForSelector('.complaintSelTab .st2 a p', { timeout: config.WAITFOR_TIMEOUT });
  await complaintSelTab.click();
  
  console.log('B'.repeat(7));

  const checkbox = await page.waitForSelector('#ag-212-input', { timeout: config.WAITFOR_TIMEOUT });
  await checkbox.click();

  console.log('C'.repeat(7));

  const complaintTotal = await page.waitForSelector('#complaintToltal .btnAddCart', { timeout: config.WAITFOR_TIMEOUT });
  await complaintTotal.click();

  console.log('D'.repeat(7));

  await waitForLoadingToDissapear('.loadingWrap', page);

  const registerComplaintBtn = await page.waitForSelector('.floatComplaint.contRight .btnSubmit.mt10', { timeout: config.WAITFOR_TIMEOUT });

  await clickAndWaitForNavigation(page, registerComplaintBtn);

  console.log('E'.repeat(7));

  await waitForLoadingToDissapear('.loadingWrap', page);

  const applyBtn = await page.waitForSelector('.content .btns .btnNext', { timeout: config.WAITFOR_TIMEOUT });

  await clickAndWaitForNavigation(page, applyBtn);

  console.log('F'.repeat(7));

  await waitForLoadingToDissapear('.loadingWrap', page);

  await page.screenshot({ path:'screenshot_final.jpeg', fullPage: true, quality: 100 });

  console.log('G'.repeat(7));

  const firstIssued = await page.waitForSelector('.tableScroll tbody tr td a[title="발급"]', { timeout: config.WAITFOR_TIMEOUT });
  await firstIssued.click();

  console.log('H'.repeat(7));

  const newWindowTarget = await browser.waitForTarget((target) => {
    const urlToParse = target.url();
    const url = new URL(urlToParse);
    const regex = /report/;

    return regex.test(url.pathname);
  });

  console.log('I'.repeat(7));

  const pdfTabPage = await newWindowTarget.page();
  const printIcon = await pdfTabPage.waitForSelector('#re_printc15e530a2dab14b4cb8923fa985ed5f42', { timeout: config.WAITFOR_TIMEOUT });
  await printIcon.click();

  console.log('J'.repeat(7));

  const printBtn = await pdfTabPage.waitForSelector('.report_popup_view button[title="인쇄"]');
  await printBtn.click();

  console.log('K'.repeat(7));

  await pdfTabPage.waitForTimeout(config.PDF_TIMEOUT_SAVE);

  await pdfTabPage.screenshot({ path: 'screenshot_pdf.jpeg', fullPage: true, quality: 100 });

  console.log('L'.repeat(7));

  await browser.close();
}

async function fillInAddressNumberForm(page) {
  const selectCity = await page.waitForSelector('.formIn [name="sidoCd"]');
  await selectCity.select('1083');

  await waitForLoadingToDissapear('.loadingWrap', page);

  const selectedCounty = await page.waitForSelector('.formIn [name="sigunguCd"]');
  await selectedCounty.select('41285');

  await waitForLoadingToDissapear('.loadingWrap', page);

  const selectedDistrict = await page.waitForSelector('.formIn [name="bjdongCd"]');
  await selectedDistrict.select('10500');

  const selectLocation = await page.waitForSelector('.formIn [name="platGbCd"]');
  await selectLocation.select('0');

  const selectFirstInput = await page.waitForSelector('.formIn input[name="mnnm"]');
  await selectFirstInput.type('796', { delay: config.TYPING_DELAY });

  const submitButton = await page.waitForSelector('.btnWarp.mt20 .btnNext.btnSolid.btnLarge.btn_dark');
  await submitButton.click();
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

async function clickAndWaitForNavigation(
  page, 
  element, 
  isInView = true, 
  selector = '', 
) {
  if (isInView) {
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: config.WAITFOR_TIMEOUT }),
        element.click()
      ]);
    } catch (error) {
      quitProgramWithErrorMessage(error);
    }
  } else {
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load', timeout: config.WAITFOR_TIMEOUT }),
        page.click(selector)
      ]);
    } catch (error) {
      quitProgramWithErrorMessage(error);
    }
  }
}

async function loginToSite(page) {
  const loginInput = await page.waitForSelector('#membId', { timeout: config.WAITFOR_TIMEOUT });
  const loginPwd = await page.waitForSelector('#pwd', { timeout: config.WAITFOR_TIMEOUT });
  const formLoginBtn = await page.waitForSelector('.loginWrap .loginForm .btnLogin', { timeout: config.WAITFOR_TIMEOUT });

  await loginInput.type(config.LOGIN_ID, { delay: config.TYPING_DELAY });
  await loginPwd.type(config.LOGIN_PASSWORD, { delay: config.TYPING_DELAY });

  await clickAndWaitForNavigation(page, formLoginBtn);
}

function quitProgramWithErrorMessage(error) {
  console.error(error);
  process.exit(1);
}

main();