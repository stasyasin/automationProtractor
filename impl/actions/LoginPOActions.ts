import { element } from 'protractor';
import { ActionUtils } from '../../fwk/utils/ActionUtils';
import { ILoginPOActions } from '../interfaces/ILoginPOActions';
import { LoginPOLocators } from '../locators/LoginPOLocators';
import { CommonPOLocators } from '../locators/CommonPOLocators';
import { WaitUtils } from '../../fwk/utils/WaitUtils';

const timeout = global['implicitlyWait'];

export class LoginPOActions extends ActionUtils implements ILoginPOActions {

  performLogin(userId: string, password: string): void {
    this.clickSignInLink();
    this.fillUserId(userId);
    this.fillPassword(password);
    this.clickSignInButton();
  }

  clickSignInLink(): void {
    ActionUtils.scrollAndClickElement(element.all(CommonPOLocators.LOC_HEADER_LINK).get(2),
      timeout, 'Click Sign in Link error');
    WaitUtils.waitForElementPresent(element.all(LoginPOLocators.LOC_EMAIL_INPUT).get(0));
  }

  fillUserId(value: string): void {
    ActionUtils.fillElementInput(element.all(LoginPOLocators.LOC_EMAIL_INPUT).get(0), value, timeout,
      'Fill UserId input error');
  }

  fillPassword(value: string): void {
    ActionUtils.fillElementInput(element.all(LoginPOLocators.LOC_PASSWORD_INPUT).get(0), value, timeout,
      'Fill Password input error');
  }

  clickSignInButton(): void {
    ActionUtils.scrollAndClickElement(element.all(LoginPOLocators.LOC_LOGIN_BUTTON).get(0),
      timeout, 'Click Sign in button error');
  }
}
