import * as protractor from 'protractor';
import { browser, element, ElementFinder } from 'protractor';
import * as webdriver from 'selenium-webdriver';
import * as webDriver from 'selenium-webdriver';
import ILocation = webdriver.ILocation;
import By = webdriver.By;

export class AbstractChecks {

  /**
   * This method scroll to the element and take it Text
   * NOTE: Text mean that it is working only for Labels, etc, but doesn't work for FIELDS
   * @param elem
   * @return {Promise<string>}
   */
  static scrollAndGetText(elem: ElementFinder): webdriver.promise.Promise<string> {
    return this.isElementDisplayed(elem).then(
      (isDisplayed) => {
        if (isDisplayed) {
          return this.goToWebElement(elem).then(() => {
            return elem.getText();
          });
        }
        else {
          return null;
        }
      }
    );
  }

  /**
   * This method is go to element and check if it is displayed or not.
   * Note: It will wait till global['implicitlyWait'] from qaprotractor.conf.js file
   * @param elem
   * @return {Promise<boolean>}
   */
  static isElementDisplayed(elem: ElementFinder): webdriver.promise.Promise<boolean> {
    return elem.isPresent().then(
      (isPresent) => {
        if (isPresent) {
          return this.goToWebElement(elem).then(() => {
            return elem.isDisplayed();
          });
        }
        else {
          return false;
        }
      },
      () => {
        return false;
      }
    );
  }

  /**
   * This method is go to element and check if it is displayed and Enabled or not.
   * Note: It will wait till global['implicitlyWait'] from qaprotractor.conf.js file
   * @param elem
   * @return {Promise<boolean>}
   */
  static isElementDisplayedAndEnabled(elem: ElementFinder): webdriver.promise.Promise<boolean> {
    return elem.isPresent().then(
      (isPresent) => {
        if (isPresent) {
          return this.goToWebElement(elem).then(() => {
            if (elem.isDisplayed()) {
              return elem.isEnabled();
            }
            return false;
          });
        }
        else {
          return false;
        }
      },
      () => {
        return false;
      }
    );
  }

  /**
   * This method scroll to the element and take it value
   * NOTE: Value mean that it is working only for Fields,  but doesn't work for labels
   * @param elem
   * @return {Promise<string>}
   */
  static scrollAndGetValue(elem: ElementFinder): webdriver.promise.Promise<string> {
    return this.isElementDisplayed(elem).then(
      (isDisplayed) => {
        if (isDisplayed) {
          return this.goToWebElement(elem).then(() => {
            return elem.getAttribute('value');
          });
        }
        else {
          return null;
        }
      }
    );
  }

  /**
   * This method will return Chechbox State and return promise true if selected , promise false if not selected
   * @param elem
   * @return {wdpromise.Promise<boolean>}
   */
  static getCheckboxState(elem: ElementFinder): webDriver.promise.Promise<boolean> {
    return elem.isSelected();
  }

  /**
   * This method will return Element enabled status. Return promise true if element is enabled, promsie false when disabled(inactive)
   * @param locator
   * @return {wdpromise.Promise<boolean>}
   */
  static getElementEnabledStatus(locator: By): webDriver.promise.Promise<boolean> {
    let checkbox: ElementFinder = element.all(locator).get(0);
    return checkbox.isEnabled();
  }

  /**
   * Method goToWebElement, scroll to the required item, returns a promise or call the call back if specified
   * @param {protractor.ElementFinder} element The element to focus on
   * @param {Function} optional callback The callback to call after we focus on the object
   */
  static goToWebElement(object: protractor.ElementFinder, callback?: () => void): any {
    let promise = browser.executeScript('arguments[0].focus()', object.getWebElement());
    if (typeof callback === 'function') {
      promise.then(function() {
        callback();
      }, function(err) {
        console.error(err);
      });
    }
    else {
      return promise;
    }
  }

  /**
   * This method get Attribute of element and return it as promise string
   * @param elem
   * @param attr
   * @return {Promise<string>}
   */
  static getElementAttribute(elem: ElementFinder, attr: string): webdriver.promise.Promise<string> {
    return this.isElementDisplayed(elem).then(
      (isDisplayed) => {
        if (isDisplayed) {
          return this.goToWebElement(elem).then(() => {
            return elem.getAttribute(attr);
          });
        }
        else {
          return null;
        }
      }
    );
  }

  /**
   * This Method take Absolute view-location of the element.
   * @param elem
   * @return {wdpromise.Promise<ILocation>}
   */
  static getElementLocation(elem: ElementFinder): webdriver.promise.Promise<ILocation> {
    return elem.getLocation();
  }

  /**
   * Method to get current browser Url
   */
  static getPageURL(): webdriver.promise.Promise<string> {
    return browser.getCurrentUrl();
  }

  /**
   * This method will return number of elements
   * @param locator
   * @return {wdpromise.Promise<number>}
   */
  static getElementNumber(locator: By): webDriver.promise.Promise<number> {
    return element.all(locator).count();
  }


}
