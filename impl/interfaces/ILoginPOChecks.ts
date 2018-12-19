import * as webDriver from 'selenium-webdriver';

export interface ILoginPOChecks {

  /**
   * This method check that Sign In Link is displayed
   * @return promise truthy or falsy
   */
  isSignInLinkDisplayed(): Promise<boolean>;

}
