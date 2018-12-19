import { element } from 'protractor';
import { CheckUtils } from '../../fwk/utils/CheckUtils';
import { ILoginPOChecks } from '../interfaces/ILoginPOChecks';
import { WaitUtils } from '../../fwk/utils/WaitUtils';
import { CommonPOLocators } from '../locators/CommonPOLocators';

export class LoginPOChecks implements ILoginPOChecks {

  async isSignInLinkDisplayed(): Promise<boolean> {
    WaitUtils.waitForElementPresent(element.all(CommonPOLocators.LOC_HEADER_LINK).get(2));
    return await CheckUtils.isElementDisplayed(element.all(CommonPOLocators.LOC_HEADER_LINK).get(2));
  }

}
