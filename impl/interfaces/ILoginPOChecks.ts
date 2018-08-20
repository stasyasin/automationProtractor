import * as webDriver from 'selenium-webdriver';
import {IAbstractChecks} from './IAbstractChecks';

export interface ILoginPOChecks extends IAbstractChecks {

  /**
   * This method check that Sign In Link is displayed
   * @return promise truthy or falsy
   */
  isSignInLinkDisplayed(): webDriver.promise.Promise<boolean>;

}
