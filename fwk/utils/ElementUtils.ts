import { element, ElementFinder, Locator } from 'protractor';

export function getElement(locator: Locator, index: number = 0): ElementFinder {
  return element.all(locator).get(index);
}
