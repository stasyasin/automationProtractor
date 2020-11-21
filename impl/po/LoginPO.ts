import * as ActionUtils from '../../fwk/utils/ActionUtils';
import { LoginPOLocators } from '../locators/LoginPOLocators';
import { CommonPOLocators } from '../locators/CommonPOLocators';
import * as WaitUtils from '../../fwk/utils/WaitUtils';
import * as CheckUtils from '../../fwk/utils/CheckUtils';
import { getElement } from '../../fwk/utils/ElementUtils';


export class LoginPO {

  async isSignInLinkDisplayed(): Promise<boolean> {
    await WaitUtils.waitForElementPresent(getElement(CommonPOLocators.LOC_HEADER_LINK, 2));
    return await CheckUtils.isElementDisplayed(getElement(CommonPOLocators.LOC_HEADER_LINK, 2));
  }

  async performLogin(userId: string, password: string): Promise<void> {
    await this.clickSignInLink();
    await this.fillUserId(userId);
    await this.fillPassword(password);
    await this.clickSignInButton();
  }

  async clickSignInLink(): Promise<void> {
    await ActionUtils.scrollAndClickElement(getElement(CommonPOLocators.LOC_HEADER_LINK, 2), 'Click Sign in Link error');
    await WaitUtils.waitForElementPresent(getElement(LoginPOLocators.LOC_EMAIL_INPUT));
  }

  async fillUserId(value: string): Promise<void> {
    await ActionUtils.fillElementInput(getElement(LoginPOLocators.LOC_EMAIL_INPUT), value,
      'Fill UserId input error');
  }

  async fillPassword(value: string): Promise<void> {
    await ActionUtils.fillElementInput(getElement(LoginPOLocators.LOC_PASSWORD_INPUT), value,
      'Fill Password input error');
  }

  async clickSignInButton(): Promise<void> {
    await ActionUtils.scrollAndClickElement(getElement(LoginPOLocators.LOC_LOGIN_BUTTON), 'Click Sign in button error');
  }
}
