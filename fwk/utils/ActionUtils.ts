import * as protractor from 'protractor';
import { browser, ElementFinder } from 'protractor';
import * as WaitUtils from './WaitUtils';
import path = require('path');
import * as CheckUtils from './CheckUtils';

/**
 * static scrollAndClickElement function
 * focus to the element, wait that element becomes to be clickable and click
 * @param elem the locator for the button
 * @param {number=} optTimeout How long to wait for the condition to be true.
 * @param {string=} optMessage An optional message to use if the wait times
 */
export async function scrollAndClickElement(elem: ElementFinder, optMessage?: string, optTimeout?: number): Promise<void> {
  if (await elem.isPresent()) {
    await CheckUtils.goToWebElement(elem);
  }
  await browser.wait(protractor.ExpectedConditions.elementToBeClickable(elem), getTimeout(optTimeout), optMessage);
  await elem.click();
}

/**
 * Scroll to a center of  element IntoView
 * @param elem
 */
export async function scrollIntoCenterView(elem: ElementFinder): Promise<void> {
  await browser.executeScript(`arguments[0].scrollIntoView({behavior:'auto',block:'center',inline:'center'});`,
    elem.getWebElement());
}

/**
 * static scrollAndDoubleClickElement function
 * focus to the element, wait that element becomes to be clickable and doubleClick
 * @param elem the locator for the button
 * @param {string=} optMessage An optional message to use if the wait times
 * @param {number=} optTimeout How long to wait for the condition to be true.
 */
export async function scrollAndDoubleClickElement(elem: ElementFinder, optMessage?: string, optTimeout?: number): Promise<void> {
  if (await elem.isPresent()) {
    await CheckUtils.goToWebElement(elem);
  }
  await browser.wait(protractor.ExpectedConditions.elementToBeClickable(elem), getTimeout(optTimeout), optMessage);
  await browser.actions()
    .doubleClick(elem.getWebElement())
    .perform();
}

/**
 * Hard click on element, no checks
 * @param elem
 */
export async function hardClickElement(elem: ElementFinder): Promise<void> {
  await elem.click();
}

/**
 * static pressAndHoldElement function
 * Method press and hold on Element specified amount of time
 * @param elem: element which need to press
 * @param holdTimeSec: time in seconds to hold
 */
export async function pressAndHoldElement(elem: ElementFinder, holdTimeSec: number): Promise<void> {
  if (await elem.isPresent()) {
    await CheckUtils.goToWebElement(elem);
  }
  // press mouse down
  await browser.actions()
    .mouseDown(elem.getWebElement()).perform();
  await browser.sleep(holdTimeSec * 1000);
  await browser.actions().mouseUp(elem.getWebElement()).perform();
}

/**
 * This method will take element and drag and drop it to coordinates
 * @param dragElement - element that we are going to move
 * @param x - coordinates by abscissa (positive value -> to the right, negative value -> to the left)
 * @param y - coordinates by ordinate( positive value -> to the top, negative value -> to the down)
 */
export async function dragAndDropToCoordinates(dragElement: ElementFinder, x: number, y: number): Promise<void> {
  await browser.actions()
    .dragAndDrop(dragElement.getWebElement(), { x, y })
    .mouseUp()
    .perform();
}

/**
 * This method will swipe element and drag and drop it to coordinates
 * @param elem - element that we are going to move
 * @param x - coordinates by abscissa (positive value -> to the right, negative value -> to the left)
 * @param y - coordinates by ordinate( positive value -> to the top, negative value -> to the down)
 */
export async function swipeElement(elem: ElementFinder, x: number, y: number): Promise<void> {
  if (await elem.isPresent()) {
    await CheckUtils.goToWebElement(elem);
  }

  await browser.actions()
    .mouseDown(elem.getWebElement())
    .mouseMove(elem.getWebElement(), { x: x, y: y })
    .mouseUp()
    .perform();
}

/**
 * This method will swipe element and drag and drop it to coordinates
 * @param elem - element that we are going to move
 * @param x - coordinates by abscissa (positive value -> to the right, negative value -> to the left)
 * @param y - coordinates by ordinate( positive value -> to the top, negative value -> to the down)
 */
export async function swipeIonicElement(elem: ElementFinder, x: number, y: number): Promise<void> {
  if (await elem.isPresent()) {
    await CheckUtils.goToWebElement(elem);
  }

  await browser.actions()
    .mouseDown(elem).perform();

  for (let i = 0; i < 8; i++) {
    await browser.actions()
      .mouseMove({ x: x / 8, y: y }).perform();
  }

  await browser.actions()
    .mouseUp()
    .perform();
}

/**
 * This method will click by coordinates from baseElement
 * @param elem - element, where you start count coordinates
 * @param x - coordinates by abscissa (positive value -> to the right, negative value -> to the left)
 * @param y - coordinates by ordinate( positive value -> to the top, negative value -> to the down)
 */
export async function clickToCoordinates(elem: ElementFinder, x: number, y: number): Promise<void> {
  await browser.actions()
    .mouseMove(elem.getWebElement(), { x, y })
    .click()
    .perform();
}

/**
 * This method will take element and drag and drop it to other Element
 * @param dragElement - element that we are going to move
 * @param dropElement - element where we want to drop
 */
export async function dragAndDropToElement(dragElement: ElementFinder, dropElement: ElementFinder): Promise<void> {
  if (await dragElement.isPresent()) {
    await CheckUtils.goToWebElement(dragElement);
  }
  await browser.actions()
    .dragAndDrop(dragElement.getWebElement(), dropElement.getWebElement())
    .mouseUp(dropElement.getWebElement())
    .perform();
}

/**
 * This method fill param text to the Element.
 * @param elem
 * @param text
 * @param optMessage
 * @param optTimeout
 * @return boolean
 */
export async function fillElementInput(elem: ElementFinder, text: string,
                                       optMessage?: string, optTimeout?: number): Promise<void> {
  if (await elem.isPresent()) {
    await CheckUtils.goToWebElement(elem);
  }
  await browser.wait(protractor.ExpectedConditions.presenceOf(elem), getTimeout(optTimeout), optMessage);
  await elem.clear();
  await elem.sendKeys(text);
}

/**
 * This method fill param text to the Select Element.
 * @param elem
 * @param text
 * @param optMessage
 * @param optTimeout
 * @return boolean
 */
export async function fillElementSelect(elem: ElementFinder, text: string,
                                        optMessage?: string, optTimeout?: number): Promise<void> {
  if (await elem.isPresent()) {
    await CheckUtils.goToWebElement(elem);
  }
  await browser.wait(protractor.ExpectedConditions.presenceOf(elem), getTimeout(optTimeout), optMessage);
  await elem.sendKeys(text);
}

/**
 * Method to upload file from path to input[type="file"] element
 * @param {ElementFinder} elem
 * @param {string} fileToUpload
 */
export async function uploadFile(elem: ElementFinder, fileToUpload: string): Promise<void> {
  if (await elem.isPresent()) {
    await CheckUtils.goToWebElement(elem);
  }

  // upload image
  await WaitUtils.wait(2);
  const absolutePath = path.resolve(__dirname, fileToUpload);

  // Unhide file input
  await browser.executeScript('arguments[0].style.visibility = "visible"; arguments[0].style.height = "1px";' +
    ' arguments[0].style.width = "1px";  arguments[0].style.opacity = 1', elem.getWebElement());
  await elem.sendKeys(absolutePath);

  // take a breath
  await WaitUtils.wait(1);
}

/**
 * Method to switch to window by index of the window
 * @param index
 */
export async function switchToWindow(index: number): Promise<void> {
  const allWindows = await browser.getAllWindowHandles();
  if (allWindows[index]) {
    await browser.switchTo().window(allWindows[index]).then();
  }
  await WaitUtils.wait(1);
}

/**
 * function to count timeout in milliseconds
 * @param timeoutSec
 */
function getTimeout(optTimeout?: number) {
  return optTimeout || global['implicitlyWait'] || undefined;
}
