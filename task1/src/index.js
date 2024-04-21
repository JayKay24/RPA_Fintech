import { URL } from 'url';
import { config, getConfiguredPage } from './config.js';
import loginToSite from './loginToSite.js';
import waitForLoadingToVanish from './waitForLoadingToVanish.js';
import clickAndWaitForNavigation from './clickAndWaitForNavigation.js';
import fillInAddressNumberForm from './fillAddressNoForm.js';

async function main() {
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

  await page.screenshot({ path:'screenshot_final.jpeg', fullPage: true, quality: 100 });

  const firstIssued = await page.waitForSelector('.tableScroll tbody tr td a[title="발급"]', { timeout: config.WAITFOR_TIMEOUT });
  await firstIssued.click();

  const newWindowTarget = await browser.waitForTarget((target) => {
    if (target.type() !== 'page') return false;

    console.log('target here!!', target);
    const page = target.page();
    console.log('page here!!', page);
    const urlToParse = page.url();
    console.log('urlToParse here!!', urlToParse);
    const url = new URL(urlToParse);
    const regex = /report/;

    return regex.test(url.pathname);
  }, { timeout: config.WAITFOR_TIMEOUT });

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

main();