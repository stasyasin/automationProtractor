import { by, element, protractor } from 'protractor';
import * as ActionUtils from '../../fwk/utils/ActionUtils';
import { MainPOLocators } from '../locators/MainPOLocators';
import { CommonPOLocators } from '../locators/CommonPOLocators';
import * as WaitUtils from '../../fwk/utils/WaitUtils';
import * as CheckUtils from '../../fwk/utils/CheckUtils';
import { getElement } from '../../fwk/utils/ElementUtils';

export class MainPO {

  async isStartProjectLinkDisplayed(): Promise<boolean> {
    await WaitUtils.waitForElementPresent(getElement(by.cssContainingText(
      CommonPOLocators.LOC_ANY_BODY_LINK, 'Start a project')));
    return await CheckUtils.isElementDisplayed(getElement(by.cssContainingText(
      CommonPOLocators.LOC_ANY_BODY_LINK, 'Start a project')));
  }

  async clickLogout(): Promise<void> {
    await ActionUtils.scrollAndClickElement(getElement(MainPOLocators.LOC_DROPDOWN_CARET_SPAN),
      'Click Dropdown-caret error');
    await ActionUtils.scrollAndClickElement(getElement(MainPOLocators.LOC_LOGOUT_BUTTON),
      'Click Sign out button error');
  }

  async searchRepository(repName: string, repOwner: string): Promise<void> {
    await ActionUtils.fillElementInput(getElement(CommonPOLocators.LOC_QUICK_SEARCH_INPUT), repName,
      'Fill quick search Error');
    getElement(CommonPOLocators.LOC_QUICK_SEARCH_INPUT).sendKeys(protractor.Key.ENTER);
    await ActionUtils.scrollAndClickElement(getElement(
      by.cssContainingText(MainPOLocators.LOC_SEARCH_RESULT_LINK, repOwner)),
      'Click Repository search result link Error');
  }
}
