import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

export const buildDriver = async () => {
  const options = new chrome.Options();
  if (!process.env.HEADFUL) options.addArguments('--headless=new');
  options.addArguments('--window-size=1366,768');
  options.addArguments('--disable-blink-features=AutomationControlled');
  options.addArguments('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36');
  return await new Builder().forBrowser('chrome').setChromeOptions(options).build();
};
