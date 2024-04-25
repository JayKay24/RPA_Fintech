import { config } from './config.js';

async function waitForReadyState(page) {
  const isDocReady = () => document.readyState === 'complete';

  await page.waitForFunction(isDocReady, { timeout: config.WAITFOR_TIMEOUT });
}

export default waitForReadyState;
