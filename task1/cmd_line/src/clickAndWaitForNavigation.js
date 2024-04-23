import quitProgramWithErrorMessage from './quitProgram.js';
import { config } from './config.js';

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

export default clickAndWaitForNavigation;
