import * as protractor from 'protractor';
import { browser, ElementFinder } from 'protractor';
import * as webDriver from 'selenium-webdriver';
import { WaitUtils } from './WaitUtils';
import path = require('path');

export class ActionUtils {

  /**
   * static scrollAndClickElement function
   * focus to the element, wait that element becomes to be clickable and click
   * @param elem the locator for the button
   * @param {number=} optTimeout How long to wait for the condition to be true.
   * @param {string=} optMessage An optional message to use if the wait times
   */
  static scrollAndClickElement(elem: ElementFinder, optTimeout?: number, optMessage?: string): void {
    const timeoutToWait = optTimeout || global['implicitlyWait'] || undefined;
    // navigate to element
    browser.actions()
      .mouseMove(elem.getWebElement())
      .perform();
    browser.wait(protractor.ExpectedConditions.elementToBeClickable(elem), timeoutToWait, optMessage).then(() => {
      elem.click();
    });
  }

  /**
   * static pressAndHoldElement function
   * Method press and hold on Element specified amount of time
   * @param elem: element which need to press
   * @param holdTimeSec: time in seconds to hold
   */
  static pressAndHoldElement(elem: ElementFinder, holdTimeSec: number): void {
    // navigate to element
    browser.actions()
      .mouseMove(elem.getWebElement()).perform();
    // press mouse down
    browser.actions()
      .mouseDown(elem.getWebElement()).perform();
    browser.sleep(holdTimeSec * 1000);
    browser.actions().mouseUp(elem.getWebElement()).perform();
  }

  /**
   * This method will take element and drag and drop it to coordinates
   * @param dragElement - element that we are going to move
   * @param x - coordinates by abscissa (positive value -> to the right, negative value -> to the left)
   * @param y - coordinates by ordinate( positive value -> to the top, negative value -> to the down)
   */
  static dragAndDropToCoordinates(dragElement: ElementFinder, x: number, y: number): void {
    browser.actions()
      .dragAndDrop(dragElement.getWebElement(), { x, y })
      .mouseUp()
      .perform();
  }

  /**
   * This method will swipe element and drag and drop it to coordinates
   * @param swipeElem - element that we are going to move
   * @param x - coordinates by abscissa (positive value -> to the right, negative value -> to the left)
   * @param y - coordinates by ordinate( positive value -> to the top, negative value -> to the down)
   */
  static swipeElement(swipeElem: ElementFinder, x: number, y: number): void {
    // focus to the element
    browser.actions()
      .mouseMove(swipeElem.getWebElement())
      .perform();

    browser.actions()
      .mouseDown(swipeElem.getWebElement())
      .mouseMove(swipeElem.getWebElement(), { x: x, y: y })
      .mouseUp()
      .perform();
  }

  /**
   * This method will swipe element and drag and drop it to coordinates
   * @param swipeElem - element that we are going to move
   * @param x - coordinates by abscissa (positive value -> to the right, negative value -> to the left)
   * @param y - coordinates by ordinate( positive value -> to the top, negative value -> to the down)
   */
  static swipeIonicElement(swipeElem: ElementFinder, x: number, y: number): void {
    // focus to the element
    browser.actions()
      .mouseMove(swipeElem)
      .perform();

    browser.actions()
      .mouseDown(swipeElem).perform();

    for (let i = 0; i < 8; i++) {
      browser.actions()
        .mouseMove({ x: x / 8, y: y }).perform();
    }

    browser.actions()
      .mouseUp()
      .perform();
  }

  /**
   * This method will click by coordinates from baseElement
   * @param baseElement - element, where you start count coordinates
   * @param x - coordinates by abscissa (positive value -> to the right, negative value -> to the left)
   * @param y - coordinates by ordinate( positive value -> to the top, negative value -> to the down)
   */
  static clickToCoordinates(baseElement: ElementFinder, x: number, y: number): void {
    browser.actions()
      .mouseMove(baseElement.getWebElement(), { x, y })
      .click()
      .perform();
  }

  /**
   * This method will take element and drag and drop it to other Element
   * @param dragElement - element that we are going to move
   * @param dropElement - element where we want to drop
   */
  static dragAndDropToElement(dragElement: ElementFinder, dropElement: ElementFinder): void {
    browser.actions()
      .dragAndDrop(dragElement.getWebElement(), dropElement.getWebElement())
      .mouseUp(dropElement.getWebElement())
      .perform();
  }

  /**
   * This method fill param text to the Element.
   * @param elem
   * @param text
   * @param optTimeout
   * @param optMessage
   * @return boolean
   */
  static fillElementInput(elem: ElementFinder, text: string,
                          optTimeout?: number, optMessage?: string): webDriver.promise.Promise<boolean> {
    const timeoutToWait = optTimeout || global['implicitlyWait'] || undefined;
    return browser.wait(protractor.ExpectedConditions.presenceOf(elem), timeoutToWait, optMessage).then(() => {
      return elem.clear().then(() => {
        return elem.sendKeys(text).then(() => {
          return elem.getAttribute('value').then((txt) => {
            return txt === text;
          });
        });
      });
    });
  }

  /**
   * This method fill param text to the Select Element.
   * @param elem
   * @param text
   * @param optTimeout
   * @param optMessage
   * @return boolean
   */
  static fillElementSelect(elem: ElementFinder, text: string,
                           optTimeout?: number, optMessage?: string): webDriver.promise.Promise<boolean> {
    const timeoutToWait = optTimeout || global['implicitlyWait'] || undefined;
    return browser.wait(protractor.ExpectedConditions.presenceOf(elem), timeoutToWait, optMessage).then(() => {
      return elem.sendKeys(text).then(() => {
        return elem.getAttribute('value').then((txt) => {
          return txt === text;
        });
      });
    });
  }

  /**
   * Method to upload file from path to input[type="file"] element
   * @param {ElementFinder} elem
   * @param {string} fileToUpload
   */
  static uploadFile(elem: ElementFinder, fileToUpload: string): void {
    // focusing to the element
    browser.actions()
      .mouseMove(elem)
      .perform();

    // upload image
    WaitUtils.wait(2);
    const absolutePath = path.resolve(__dirname, fileToUpload);

    // Unhide file input
    browser.executeScript('arguments[0].style.visibility = "visible"; arguments[0].style.height = "1px";' +
      ' arguments[0].style.width = "1px";  arguments[0].style.opacity = 1', elem.getWebElement());
    elem.sendKeys(absolutePath);

    // take a breath
    WaitUtils.wait(1);

  }

  /**
   * Method to switch to window by index of the window
   * @param index
   */
  static switchToWindow(index: number): void {
    browser.getAllWindowHandles().then((handles) => {
      browser.switchTo().window(handles[index]);
    });
    WaitUtils.wait(1);
  }

}
