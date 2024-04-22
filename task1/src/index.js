import { URL } from 'url';
import { config, getConfiguredPage } from './config.js';
import loginToSite from './loginToSite.js';
import waitForLoadingToVanish from './waitForLoadingToVanish.js';
import clickAndWaitForNavigation from './clickAndWaitForNavigation.js';
import fillInAddressNumberForm from './fillAddressNoForm.js';
import waitForReadyState from './waitForReadyState.js';
import blockMediaDownLoad from './blockMediaDownload.js';

async function main() {
  const start = Date.now();
  const [browser, page] = await getConfiguredPage();

  await page.goto(config.BASE_URL, { waitUntil: 'load' });

  await loginToSite(page);

  await waitForLoadingToVanish('#nuxt-loading', page);

  await waitForLoadingToVanish('.loadingWrap', page);

  await page.waitForSelector('.registerUi .bldreDiv.bldre1 p', { timeout: config.WAITFOR_TIMEOUT });

  await clickAndWaitForNavigation(page, null, false, '.registerUi .bldreDiv.bldre1 p');

  await waitForLoadingToVanish('#nuxt-loading', page);

  await waitForLoadingToVanish('.loadingWrap', page);

  const searchByAddressNoBtn = await page.waitForSelector('.AddrSearch .btnLotNum', { timeout: config.WAITFOR_TIMEOUT });
  if (!searchByAddressNoBtn) quitProgramWithErrorMessage('search by address number button not found');
  await searchByAddressNoBtn.click();

  await fillInAddressNumberForm(page);

  await waitForLoadingToVanish('.loadingWrap', page);

  const complaintSelTab = await page.waitForSelector('.complaintSelTab .st2 a p', { timeout: config.WAITFOR_TIMEOUT });
  await complaintSelTab.click();
  
  const checkbox = await page.waitForSelector('#ag-212-input', { timeout: config.WAITFOR_TIMEOUT });
  await checkbox.click();

  const complaintTotal = await page.waitForSelector('#complaintToltal .btnAddCart', { timeout: config.WAITFOR_TIMEOUT });
  await complaintTotal.click();

  await waitForLoadingToVanish('.loadingWrap', page);

  const registerComplaintBtn = await page.waitForSelector('.floatComplaint.contRight .btnSubmit.mt10', { timeout: config.WAITFOR_TIMEOUT });

  await clickAndWaitForNavigation(page, registerComplaintBtn);

  await waitForLoadingToVanish('.loadingWrap', page);

  const applyBtn = await page.waitForSelector('.content .btns .btnNext', { timeout: config.WAITFOR_TIMEOUT });

  await clickAndWaitForNavigation(page, applyBtn);

  await waitForLoadingToVanish('.loadingWrap', page);

  const firstIssued = await page.waitForSelector('.tableScroll tbody tr td a[title="발급"]', { timeout: config.WAITFOR_TIMEOUT });
  await firstIssued.click();

  const newWindowTarget = await browser.waitForTarget(async (target) => {
    if (target.type() !== 'page') return false;

    const page = await target.page();
    const urlToParse = page.url();
    const url = new URL(urlToParse);
    const regex = /report/;

    return regex.test(url.pathname);
  }, { timeout: config.WAITFOR_TIMEOUT });

  let pdfTabPage = await newWindowTarget.page();

  pdfTabPage = await blockMediaDownLoad(pdfTabPage);

  await pdfTabPage.setRequestInterception(true);

  await waitForReadyState(pdfTabPage);

  await pdfTabPage.pdf({ path: 'complaint.pdf', printBackground: true, format: 'A4' });

  const printIcon = await pdfTabPage.waitForSelector(
    '[title="인쇄"].report_menu_button.report_menu_print_button.report_menu_print_button_svg',
    { timeout: config.WAITFOR_TIMEOUT }
  );
  await printIcon.click();

  await pdfTabPage.waitForSelector(
    '.report_print_view_position.report_view_box button[title="인쇄"]',
    { timeout: config.WAITFOR_TIMEOUT }
  );

  // await pdfTabPage.screenshot({ path: 'screenshot_last.jpeg', fullPage: true, quality: 100, type: 'jpeg' });

  // await printBtn.click();

  const end = Date.now();

  const difference = (end - start) / 1000;

  console.log('Time elapsed in seconds:', difference);

  await browser.close();
}

main();