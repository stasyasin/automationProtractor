import {by} from 'protractor';

export const LoginPOLocators:any =  {
  LOC_LOGIN_BUTTON: by.css('#login input[name="commit"]'),
  LOC_EMAIL_INPUT: by.css('#login input[name="login"]'),
  LOC_PASSWORD_INPUT: by.css('#login input[name="password"]'),
}
