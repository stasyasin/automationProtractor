import { element } from 'protractor';
import * as webDriver from 'selenium-webdriver';
import { AbstractChecks } from '../../fwk/abstractPO/AbstractChecks';
import { WaitUtils } from '../../fwk/utils/WaitUtils';
import { IRepositoryPOChecks } from '../interfaces/IRepositoryPOChecks';
import { RepositoryPOLocators } from '../locators/RepositoryPOLocators';

export class RepositoryPOChecks extends AbstractChecks implements IRepositoryPOChecks {

  isSummaryButtonDisplayed(): webDriver.promise.Promise<boolean> {
    WaitUtils.waitForElementPresent(element.all(RepositoryPOLocators.LOC_REP_SUMMARY_BUTTON).get(0));
    return AbstractChecks.isElementDisplayed(element.all(RepositoryPOLocators.LOC_REP_SUMMARY_BUTTON).get(0));
  }
}
