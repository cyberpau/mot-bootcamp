// chromedriver reference: https://www.npmjs.com/package/chromedriver#running-with-selenium-webdriver
require('chromedriver')
const { Builder, By, Key, until } = require('selenium-webdriver')
const { Options } = require('selenium-webdriver/chrome')

// test timeout 5 minutes
jest.setTimeout(300000)

/** Author: John Paulo Mataac */
describe('selenium bootcamp google search', () => {
  it('basic search', async () => {

    // generate options for chrome
    const chromeOptions = new Options()
    // detailed info for these args: https://peter.sh/experiments/chromium-command-line-switches/
    chromeOptions.addArguments('--no-sandbox')
    chromeOptions.addArguments('--disable-gpu')
    chromeOptions.addArguments('--disable-dev-shm-usage')
    // turn off headless by removing this
    // chromeOptions.addArguments('--headless')
    chromeOptions.windowSize({ width: 1920, height: 1080 })

    // selenium webdriver
    const driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build()


    try {
      // 1.0 Navigate to npm homepage - https://www.google.com/
      await driver.get(`https://www.google.com/`)

      // Wait until browser loads completely
      await driver.sleep(2000)
      await driver.wait(() => {
        return driver.executeScript('return document.readyState').then(state => {
          return state === 'complete'
        })
      }, 120000)

      // 1.1 Validate that the title matches expected homepage title
      const homepageTitle = await driver.getTitle()
      expect(homepageTitle).toEqual('Google')

      // 2.0 Fill up search field using my search criteria (selenium bootcamp), then hit enter key
      await driver
        .wait(until.elementLocated(By.xpath(`//input[@name='q']`)))
        .sendKeys('selenium bootcamp', Key.ENTER)

      // Wait until browser loads completely
      await driver.sleep(2000)
      await driver.wait(() => {
        return driver.executeScript('return document.readyState').then(state => {
          return state === 'complete'
        })
      }, 120000)

      // 2.1 Validate that the title matches expected search page title 'selenium bootcamp - Google Search'
      const searchPageTitle = await driver.getTitle()
      expect(searchPageTitle).toEqual('selenium bootcamp - Google Search')

      // 2.2 Validate that we have a result that matches our search criteria : "selenium“ or "bootcamp“
      const listingMatch = await driver.findElement(By.xpath(`//div//a[.//h3[contains(.,'selenium') or contains(.,'bootcamp')]]`))
      expect(listingMatch).toBeTruthy()

    } finally {
      await driver.quit()
    }
  })
})
