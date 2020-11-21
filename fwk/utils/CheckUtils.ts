import { browser, element, ElementFinder } from 'protractor';
import * as webdriver from 'selenium-webdriver';
import ILocation = webdriver.ILocation;
import By = webdriver.By;

/**
 * Method goToWebElement, scroll to the required item, returns a promise or call the call back if specified
 * @param elem element The element to focus on
 * @param callback optional callback The callback to call after we focus on the object
 */
export async function goToWebElement(elem: ElementFinder, callback?: () => void): Promise<void> {
  if (await elem.isPresent()) {
    await browser.actions()
      .mouseMove(elem.getWebElement())
      .perform();
  }
}

/**
 * This method is go to element and check if it is displayed or not.
 * Note: It will wait till global['implicitlyWait'] from qaprotractor.conf.js file
 * @param elem
 * @return {Promise<boolean>}
 */
export async function isElementDisplayed(elem: ElementFinder): Promise<boolean> {
  if (await elem.isPresent()) {
    await this.goToWebElement(elem);
    return elem.isDisplayed();
  } else {
    return null;
  }
}

/**
 * This method is go to element and check if it is displayed and Enabled or not.
 * Note: It will wait till global['implicitlyWait'] from qaprotractor.conf.js file
 * @param elem
 * @return {Promise<boolean>}
 */
export async function isElementDisplayedAndEnabled(elem: ElementFinder): Promise<boolean> {
  if (await this.isElementDisplayed(elem)) {
    await this.goToWebElement(elem);
    return await elem.isEnabled();
  } else {
    return null;
  }
}

/**
 * This method scroll to the element and take it Text
 * NOTE: Text mean that it is working only for Labels, etc, but doesn't work for FIELDS
 * @param elem
 * @return {Promise<string>}
 */
export async function scrollAndGetText(elem: ElementFinder): Promise<string> {
  if (await this.isElementDisplayed(elem)) {
    await this.goToWebElement(elem);
    return await elem.getText();
  } else {
    return null;
  }
}

/**
 * This method scroll to the element and take it value
 * NOTE: Value mean that it is working only for Fields,  but doesn't work for labels
 * @param elem
 * @return {Promise<string>}
 */
export async function scrollAndGetValue(elem: ElementFinder): Promise<string> {
  if (await this.isElementDisplayed(elem)) {
    await this.goToWebElement(elem);
    return await elem.getAttribute('value');
  } else {
    return null;
  }
}

/**
 * This method will return Chechbox State and return promise true if selected , promise false if not selected
 * @param elem
 * @return {wdpromise.Promise<boolean>}
 */
export async function getCheckboxState(elem: ElementFinder): Promise<boolean> {
  if (await this.isElementDisplayed(elem)) {
    await this.goToWebElement(elem);
    return await elem.isSelected();
  } else {
    return null;
  }
}

/**
 * This method will return Element enabled status. Return promise true if element is enabled,
 * promsie false when disabled(inactive)
 * @param locator
 * @return {wdpromise.Promise<boolean>}
 */
export async function getElementEnabledStatus(locator: By): Promise<boolean> {
  const checkbox: ElementFinder = element.all(locator).get(0);
  if (await this.isElementDisplayed(checkbox)) {
    await this.goToWebElement(checkbox);
    return await checkbox.isEnabled();
  } else {
    return null;
  }
}

/**
 * This method get Attribute of element and return it as promise string
 * @param elem
 * @param attr
 * @return {Promise<string>}
 */
export async function getElementAttribute(elem: ElementFinder, attr: string): Promise<string> {
  if (await this.isElementDisplayed(elem)) {
    await this.goToWebElement(elem);
    return await elem.getAttribute(attr);
  } else {
    return null;
  }
}

/**
 * This method get CSSVaule of element property and return it as promise string
 * @param elem
 * @param property
 * @return {Promise<string>}
 */
export async function getElementCSSValue(elem: ElementFinder, property: string): Promise<string> {
  if (await this.isElementDisplayed(elem)) {
    await this.goToWebElement(elem);
    return await elem.getCssValue(property);
  } else {
    return null;
  }
}

/**
 * This Method take Absolute view-location of the element.
 * @param elem
 * @return {wdpromise.Promise<ILocation>}
 */
export async function getElementLocation(elem: ElementFinder): Promise<ILocation> {
  if (await this.isElementDisplayed(elem)) {
    await this.goToWebElement(elem);
    return await elem.getLocation();
  } else {
    return null;
  }
}

/**
 * Method to get current browser Url
 */
export async function getPageURL(): Promise<string> {
  return await browser.getCurrentUrl();
}

/**
 * This method will return number of elements
 * @param locator
 * @return {wdpromise.Promise<number>}
 */
export async function getElementNumber(locator: By): Promise<number> {
  return await element.all(locator).count();
}
