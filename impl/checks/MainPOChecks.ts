import { by, element } from 'protractor';
import * as webDriver from 'selenium-webdriver';
import { CheckUtils } from '../../fwk/utils/CheckUtils';
import { IMainPOChecks } from '../interfaces/IMainPOChecks';
import { WaitUtils } from '../../fwk/utils/WaitUtils';
import { CommonPOLocators } from '../locators/CommonPOLocators';

export class MainPOChecks extends CheckUtils implements IMainPOChecks {

  isStartProjectLinkDisplayed(): webDriver.promise.Promise<boolean> {
    WaitUtils.waitForElementPresent(element.all(by.cssContainingText(
      CommonPOLocators.LOC_ANY_BODY_LINK, 'Start a project')).get(0));
    return CheckUtils.isElementDisplayed(element.all(by.cssContainingText(
      CommonPOLocators.LOC_ANY_BODY_LINK, 'Start a project')).get(0));
  }

}
