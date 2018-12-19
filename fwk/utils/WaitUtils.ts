import { browser, by, element, ElementFinder } from 'protractor';
import protractor = require('protractor');

const globalWaitTimeout: number = 30 * 1000;

export class WaitUtils {
  static waitForElementNotPresent(elem: ElementFinder, timeoutSec?: number): void {
    const timeoutToWait = timeoutSec * 1000 || globalWaitTimeout;
    browser.wait(protractor.ExpectedConditions.not(protractor.ExpectedConditions.presenceOf(elem)), timeoutToWait,
      elem.locator() + ' is present after ' + timeoutSec + ' sec').then(() => {
    });
  }

  static waitForElementPresent(elem: ElementFinder, timeoutSec?: number): void {
    const timeoutToWait = timeoutSec * 1000 || globalWaitTimeout;
    browser.wait(protractor.ExpectedConditions.presenceOf(elem), timeoutToWait,
      elem.locator() + ' is not present after ' + timeoutToWait + ' sec').then(() => {
    });
  }

  static waitForTextPresentInElement(elem: ElementFinder, text: string, timeoutSec?: number): void {
    const timeoutToWait = timeoutSec * 1000 || globalWaitTimeout;
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(elem, text), timeoutToWait,
      text + ' is not present in ' + elem.locator() + ' after ' + timeoutSec + ' sec').then(() => {
    });
  }

  static waitForButtonToBeClickable(elem: ElementFinder, timeoutSec?: number): void {
    const timeoutToWait = timeoutSec * 1000 || globalWaitTimeout;
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(elem), timeoutToWait,
      elem.locator() + ' is not clickable after ' + timeoutToWait + ' sec').then(() => {
    });
  }

  static wait(timeoutSec: number): void {
    browser.driver.sleep(timeoutSec * 1000);
  }

  static waitForSpinnerToFinish(): void {
    WaitUtils.waitForElementPresent(element.all(by.css('LOC_SPINNING_ICON')).get(0), 60);
    WaitUtils.waitForElementNotPresent(element.all(by.css('LOC_SPINNING_ICON')).get(0), 60);
  }

  /**
   * This function sleep all program execution instead of just sleeping browser.
   * @param {number} second
   */
  static waitJS(second: number): void {
    const start = new Date().getTime();
    let end = start;
    while (end < start + second * 1000) {
      end = new Date().getTime();
    }
  }
}
