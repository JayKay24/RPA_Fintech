import waitForLoadingToVanish from './waitForLoadingToVanish.js';
import { config } from './config.js';

async function fillInAddressNumberForm(page) {
  const selectCity = await page.waitForSelector('.formIn [name="sidoCd"]');
  await selectCity.select('1083');

  await waitForLoadingToVanish('.loadingWrap', page);

  const selectedCounty = await page.waitForSelector('.formIn [name="sigunguCd"]');
  await selectedCounty.select('41285');

  await waitForLoadingToVanish('.loadingWrap', page);

  const selectedDistrict = await page.waitForSelector('.formIn [name="bjdongCd"]');
  await selectedDistrict.select('10500');

  const selectLocation = await page.waitForSelector('.formIn [name="platGbCd"]');
  await selectLocation.select('0');

  const selectFirstInput = await page.waitForSelector('.formIn input[name="mnnm"]');
  await selectFirstInput.type('796', { delay: config.TYPING_DELAY });

  const submitButton = await page.waitForSelector('.btnWarp.mt20 .btnNext.btnSolid.btnLarge.btn_dark');
  await submitButton.click();
}

export default fillInAddressNumberForm;