import {by} from 'protractor';

export class LoginPOLocators {

  static LOC_LOGIN_BUTTON = by.css('#login input[name="commit"]');

  static LOC_EMAIL_INPUT = by.css('#login input[name="login"]');

  static LOC_PASSWORD_INPUT = by.css('#login input[name="password"]');

}
