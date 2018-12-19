import * as webDriver from 'selenium-webdriver';

export interface IRepositoryPOChecks {

  /**
   * This method check that summary button is displayed
   * @return promise truthy or falsy
   */
  isSummaryButtonDisplayed(): Promise<boolean>;

}
