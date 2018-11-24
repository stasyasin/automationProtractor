import * as webDriver from 'selenium-webdriver';
import { IAbstractChecks } from './IAbstractChecks';

export interface IRepositoryPOChecks extends IAbstractChecks {

  /**
   * This method check that summary button is displayed
   * @return promise truthy or falsy
   */
  isSummaryButtonDisplayed(): webDriver.promise.Promise<boolean>;

}
