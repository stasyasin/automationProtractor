import {by, element} from 'protractor';
import {AbstractActions} from '../../fwk/abstractPO/AbstractActions';
import {ILoginPOActions} from '../interfaces/ILoginPOActions';
import {LoginPOLocators} from '../locators/LoginPOLocators';
import {CommonPOLocators} from '../locators/CommonPOLocators';
import {WaitUtils} from '../../fwk/utils/WaitUtils';

const timeout = global['implicitlyWait'];

export class LoginPOActions extends AbstractActions implements ILoginPOActions {

  performLogin(userId: string, password: string): void {
    this.clickSignInLink();
    this.fillUserId(userId);
    this.fillPassword(password);
    this.clickSignInButton();
  }

  clickSignInLink(): void {
    AbstractActions.scrollAndClickElement(element.all(CommonPOLocators.LOC_HEADER_LINK).get(2),
      timeout, 'Click Sign in Link error');
    WaitUtils.waitForElementPresent(element.all(LoginPOLocators.LOC_EMAIL_INPUT).get(0));
  }

  fillUserId(value: string): void {
    AbstractActions.fillElementInput(element.all(LoginPOLocators.LOC_EMAIL_INPUT).get(0), value, timeout,
      'Fill UserId input error');
  }

  fillPassword(value: string): void {
    AbstractActions.fillElementInput(element.all(LoginPOLocators.LOC_PASSWORD_INPUT).get(0), value, timeout,
      'Fill Password input error');
  }

  clickSignInButton(): void {
    AbstractActions.scrollAndClickElement(element.all(LoginPOLocators.LOC_LOGIN_BUTTON).get(0),
      timeout, 'Click Sign in button error');
  }
}
