import * as webDriver from 'selenium-webdriver';

export interface IMainPOChecks {

  /**
   * This method check that Start Project button is displayed
   * @return promise truthy or falsy
   */
  isStartProjectLinkDisplayed(): webDriver.promise.Promise<boolean>;

}
