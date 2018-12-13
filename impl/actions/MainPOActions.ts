import { by, element, protractor } from 'protractor';
import { IMainPOActions } from '../interfaces/IMainPOActions';
import { ActionUtils } from '../../fwk/utils/ActionUtils';
import { MainPOLocators } from '../locators/MainPOLocators';
import { CommonPOLocators } from '../locators/CommonPOLocators';

const timeout = global['implicitlyWait'];

export class MainPOActions extends ActionUtils implements IMainPOActions {

  clickLogout(): void {
    ActionUtils.scrollAndClickElement(element.all(MainPOLocators.LOC_DROPDOWN_CARET_SPAN).last(),
      timeout, 'Click Dropdown-caret error');
    ActionUtils.scrollAndClickElement(element.all(MainPOLocators.LOC_LOGOUT_BUTTON).get(0),
      timeout, 'Click Sign out button error');
  }

  searchRepository(repName: string, repOwner: string): void {
    ActionUtils.fillElementInput(element.all(CommonPOLocators.LOC_QUICK_SEARCH_INPUT).get(0), repName, timeout,
      'Fill quick search Error');
    element.all(CommonPOLocators.LOC_QUICK_SEARCH_INPUT).get(0).sendKeys(protractor.Key.ENTER);
    ActionUtils.scrollAndClickElement(element.all(
      by.cssContainingText(MainPOLocators.LOC_SEARCH_RESULT_LINK, repOwner)).get(0), timeout,
      'Click Repository search result link Error');
  }
}
