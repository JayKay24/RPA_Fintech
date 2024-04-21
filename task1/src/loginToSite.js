import clickAndWaitForNavigation from './clickAndWaitForNavigation.js';
import { config } from './config.js';

async function loginToSite(page) {
  const loginInput = await page.waitForSelector('#membId', { timeout: config.WAITFOR_TIMEOUT });
  const loginPwd = await page.waitForSelector('#pwd', { timeout: config.WAITFOR_TIMEOUT });
  const formLoginBtn = await page.waitForSelector('.loginWrap .loginForm .btnLogin', { timeout: config.WAITFOR_TIMEOUT });

  await loginInput.type(config.LOGIN_ID, { delay: config.TYPING_DELAY });
  await loginPwd.type(config.LOGIN_PASSWORD, { delay: config.TYPING_DELAY });

  await clickAndWaitForNavigation(page, formLoginBtn);
}

export default loginToSite;
