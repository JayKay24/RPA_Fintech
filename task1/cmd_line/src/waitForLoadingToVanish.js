import { config } from './config.js';

async function waitForLoadingToVanish(loadingImgSelector, page) {
  const waitLoadingImg = selector => document.querySelector(selector) === null;

  await page.waitForFunction(waitLoadingImg, { timeout: config.WAITFOR_TIMEOUT }, loadingImgSelector);
}

export default waitForLoadingToVanish;