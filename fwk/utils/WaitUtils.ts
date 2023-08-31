import { browser, ElementFinder } from 'protractor';
import protractor = require('protractor');

const globalWaitTimeout: number = 40 * 1000;

export async function waitForElementNotPresent(elem: ElementFinder, timeoutSec?: number): Promise<void> {
  const timeoutMilliSec: number = getTimeout(timeoutSec);
  await browser.wait(protractor.ExpectedConditions.not(protractor.ExpectedConditions.presenceOf(elem)), timeoutMilliSec,
    `${elem.locator()} is present after ${timeoutMilliSec/1000} sec`)
    .then(() => {})
    .catch(() => {
      console.log(`${elem.locator()} is present after ${timeoutMilliSec/1000} sec`);
    });
}

export async function waitForElementPresent(elem: ElementFinder, timeoutSec?: number): Promise<void> {
  const timeoutMilliSec: number = getTimeout(timeoutSec);
  await browser.wait(protractor.ExpectedConditions.presenceOf(elem), timeoutMilliSec,
    `${elem.locator()} is not present after ${timeoutMilliSec/1000} sec`)
    .then(() => {})
    .catch(() => {
      console.log(`${elem.locator()} is not present after ${timeoutMilliSec/1000} sec`);
    });
}

export async function waitForElementPresentAndVisible(elem: ElementFinder, timeoutSec?: number): Promise<void> {
  await this.waitForElementPresent(elem, timeoutSec);
  const timeoutMilliSec: number = getTimeout(timeoutSec);
  await browser.wait(protractor.ExpectedConditions.visibilityOf(elem), getTimeout(timeoutMilliSec),
    `${elem.locator()} is not visible after ${timeoutMilliSec/1000} sec`)
    .then(() => {})
    .catch(() => {
        console.log(`${elem.locator()} is not visible after ${timeoutMilliSec/1000} sec`);
      });
}

export async function waitForTextPresentInElement(elem: ElementFinder, text: string, timeoutSec?: number): Promise<void> {
  const timeoutMilliSec: number = getTimeout(timeoutSec);
  await browser.wait(protractor.ExpectedConditions.textToBePresentInElement(elem, text), timeoutMilliSec,
    `${text} is not present in ${elem.locator()} after ${timeoutMilliSec/1000} sec`)
    .then(() => {})
    .catch(() => {
        console.log(`${elem.locator()} is not visible after ${timeoutSec/1000} sec`);
      });
}

export async function waitForButtonToBeClickable(elem: ElementFinder, timeoutSec?: number): Promise<void> {
  const timeoutMilliSec: number = getTimeout(timeoutSec);
  await browser.wait(protractor.ExpectedConditions.elementToBeClickable(elem), timeoutMilliSec,
    `${elem.locator()} is not clickable after ${timeoutMilliSec/1000} sec`)
    .then(() => {})
    .catch(() => {
      console.log(`${text} is not present in ${elem.locator()} after ${timeoutMilliSec/1000} sec`);
    });
}

export async function waitForSpinnerToFinish(elem: ElementFinder, timeoutSec?: number): Promise<void> {
  await this.waitForElementPresent(elem, timeoutSec);
  await this.waitForElementNotPresent(elem, timeoutSec);
}

export async function wait(timeoutSec: number): Promise<void> {
  await browser.driver.sleep(timeoutSec * 1000);
}

/**
 * This function sleeps all program execution instead of just sleeping browser.
 * @param {number} timeoutSec
 */
export async function waitJS(timeoutSec: number): Promise<void> {
  await setTimeout(() => {}, timeoutSec* 1000);
}

/**
 * function to count timeout in milliseconds
 * @param timeoutSec
 */
export function getTimeout(timeoutSec?: number) {
  return timeoutSec * 1000 || globalWaitTimeout;
}
