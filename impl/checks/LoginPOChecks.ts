import { element } from 'protractor';
import * as webDriver from 'selenium-webdriver';
import { CheckUtils } from '../../fwk/utils/CheckUtils';
import { ILoginPOChecks } from '../interfaces/ILoginPOChecks';
import { WaitUtils } from '../../fwk/utils/WaitUtils';
import { CommonPOLocators } from '../locators/CommonPOLocators';

export class LoginPOChecks extends CheckUtils implements ILoginPOChecks {

  isSignInLinkDisplayed(): webDriver.promise.Promise<boolean> {
    WaitUtils.waitForElementPresent(element.all(CommonPOLocators.LOC_HEADER_LINK).get(2));
    return CheckUtils.isElementDisplayed(element.all(CommonPOLocators.LOC_HEADER_LINK).get(2));
  }

}
