import {by, element, protractor} from 'protractor';
import {IMainPOActions} from '../interfaces/IMainPOActions';
import {AbstractActions} from '../../fwk/abstractPO/AbstractActions';
import {MainPOLocators} from '../locators/MainPOLocators';
import {CommonPOLocators} from '../locators/CommonPOLocators';

const timeout = global['implicitlyWait'];

export class MainPOActions extends AbstractActions implements IMainPOActions {

  clickLogout(): void {
    AbstractActions.scrollAndClickElement(element.all(MainPOLocators.LOC_DROPDOWN_CARET_SPAN).last(),
      timeout, 'Click Dropdown-caret error');
    AbstractActions.scrollAndClickElement(element.all(MainPOLocators.LOC_LOGOUT_BUTTON).get(0),
      timeout, 'Click Sign out button error');
  }

  searchRepository(repName: string, repOwner: string): void {
    AbstractActions.fillElementInput(element.all(CommonPOLocators.LOC_QUICK_SEARCH_INPUT).get(0), repName, timeout,
      'Fill quick search Error');
    element.all(CommonPOLocators.LOC_QUICK_SEARCH_INPUT).get(0).sendKeys(protractor.Key.ENTER);
    AbstractActions.scrollAndClickElement(element.all(
      by.cssContainingText(MainPOLocators.LOC_SEARCH_RESULT_LINK, repOwner)).get(0), timeout,
      'Click Repository search result link Error');
  }
}
