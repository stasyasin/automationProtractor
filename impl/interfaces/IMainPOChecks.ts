import * as webDriver from 'selenium-webdriver';
import { IAbstractChecks } from './IAbstractChecks';

export interface IMainPOChecks extends IAbstractChecks {

  /**
   * This method check that Start Project button is displayed
   * @return promise truthy or falsy
   */
  isStartProjectLinkDisplayed(): webDriver.promise.Promise<boolean>;

}
