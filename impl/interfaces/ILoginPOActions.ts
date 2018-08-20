import {By} from 'selenium-webdriver';
import {IAbstractActions} from './IAbstractActions';

export interface ILoginPOActions extends IAbstractActions {

  /**
   * Method to click on SignIn link and wait email field present
   */
  clickSignInLink(): void;

  /**
   * This method perform login based on arguments
   * @param {string} userId
   * @param {string} password
   */
  performLogin(userId: string, password: string): void;

  /**
   * This method fill userId
   * @param {webdriver.By} locator
   * @param value - userId
   */
  fillUserId(locator: By, value: string): void;

  /**
   * This method fill password
   * @param {webdriver.By} locator
   * @param value - password
   */
  fillPassword(locator: By, value: string): void;

  /**
   * Method to click on Sign In button
   */
  clickSignInButton(): void;

}
