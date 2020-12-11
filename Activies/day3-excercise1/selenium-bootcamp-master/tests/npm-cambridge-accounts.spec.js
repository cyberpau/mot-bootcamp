// chromedriver reference: https://www.npmjs.com/package/chromedriver#running-with-selenium-webdriver
require('chromedriver')
const { Builder, By, Key, until, WebElement } = require('selenium-webdriver')
const { Options } = require('selenium-webdriver/chrome')

// test timeout 5 minutes
jest.setTimeout(300000)

/** Author: John Paulo Mataac */
describe('cambridge socmed search', () => {
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

      // 1.0 Navigate to npm homepage - https://www.cambridge.org/core
      await driver.get(`https://www.cambridge.org/core`)

      // Wait until browser loads completely
      await driver.sleep(2000)
      await driver.wait(() => {
        return driver.executeScript('return document.readyState').then(state => {
          return state === 'complete'
        })
      }, 120000)

      // 1.1 Validate that the title matches expected homepage title "Cambridge"
      let pageTitle = await driver.getTitle()
      expect(pageTitle).toEqual('Cambridge Core - Journals & Books Online | Cambridge University Press')

      // Wait until browser loads completely
      await driver.sleep(2000)
      await driver.wait(() => {
        return driver.executeScript('return document.readyState').then(state => {
          return state === 'complete'
        })
      }, 120000)

      // Declare default handlers
      let url = ""
      let mainTab = await driver.getWindowHandle()
      let otherTabs = await driver.getAllWindowHandles()

      // Fetch all socmed links
      const fbLink= await driver.findElement(By.xpath(`//div[@class='social-container']//ul[@class='social']//li/a[@class='icon fb']`))
      const twLink= await driver.findElement(By.xpath(`//div[@class='social-container']//ul[@class='social']//li/a[@class='icon tw']`))
      const liLink= await driver.findElement(By.xpath(`//div[@class='social-container']//ul[@class='social']//li/a[@class='icon li']`))
      const ytLink= await driver.findElement(By.xpath(`//div[@class='social-container']//ul[@class='social']//li/a[@class='icon yt']`))
      const inLink= await driver.findElement(By.xpath(`//div[@class='social-container']//ul[@class='social']//li/a[@class='icon in']`))

      // 2.1 Check if fbLink is Cambridge's Facebook page
      fbLink.click()
      await driver.sleep(5000)
      otherTabs = await driver.getAllWindowHandles()
      await driver.switchTo().window(otherTabs[1])
      url = await driver.getCurrentUrl()
      console.log(url)
      expect(url).toEqual('https://www.facebook.com/CambridgeCore')
      await driver.close()
      await driver.switchTo().window(mainTab)

      // 2.2 Check if twLink is Cambridge's Twitter page
      twLink.click()
      await driver.sleep(5000)
      otherTabs = await driver.getAllWindowHandles()
      await driver.switchTo().window(otherTabs[1])
      url = await driver.getCurrentUrl()
      console.log(url)
      expect(url).toEqual('https://twitter.com/CambridgeCore')
      await driver.close()
      await driver.switchTo().window(mainTab)

      // 2.3 Check if liLink is Cambridge's LinkedIn page
      liLink.click()
      await driver.sleep(5000)
      otherTabs = await driver.getAllWindowHandles()
      await driver.switchTo().window(otherTabs[1])
      // Wait until browser loads completely
      await driver.sleep(2000)
      await driver.wait(() => {
        return driver.executeScript('return document.readyState').then(state => {
          return state === 'complete'
        })
      }, 120000)
      url = await driver.findElement(By.xpath(`//a[contains(.,'Cambridge')]`))
      console.log(url)
      expect(url).toBeTruthy()
      await driver.close()
      await driver.switchTo().window(mainTab)

      // 2.4 Check if ytLink is Cambridge's YouTube page
      ytLink.click()
      await driver.sleep(5000)
      otherTabs = await driver.getAllWindowHandles()
      await driver.switchTo().window(otherTabs[1])
      url = await driver.findElement(By.xpath(`//a[contains(.,'Cambridge Core')]`))
      console.log(url)
      expect(url).toBeTruthy()
      await driver.close()
      await driver.switchTo().window(mainTab)

      // 2.5 Check if inLink is Cambridge's Instagram page
      inLink.click()
      await driver.sleep(5000)
      otherTabs = await driver.getAllWindowHandles()
      await driver.switchTo().window(otherTabs[1])
      url = await driver.getCurrentUrl()
      console.log(url)
      expect(url).toEqual('https://www.instagram.com/cupacademic/')
      await driver.close()
      await driver.switchTo().window(mainTab)

    } finally {
      await driver.quit()
    }
  })
})
