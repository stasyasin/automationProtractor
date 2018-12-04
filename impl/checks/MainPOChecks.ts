import { by, element } from 'protractor';
import * as webDriver from 'selenium-webdriver';
import { AbstractChecks } from '../../fwk/abstractPO/AbstractChecks';
import { IMainPOChecks } from '../interfaces/IMainPOChecks';
import { WaitUtils } from '../../fwk/utils/WaitUtils';
import { CommonPOLocators } from '../locators/CommonPOLocators';

export class MainPOChecks extends AbstractChecks implements IMainPOChecks {

  isStartProjectLinkDisplayed(): webDriver.promise.Promise<boolean> {
    WaitUtils.waitForElementPresent(element.all(by.cssContainingText(
      CommonPOLocators.LOC_ANY_BODY_LINK, 'Start a project')).get(0));
    return AbstractChecks.isElementDisplayed(element.all(by.cssContainingText(
      CommonPOLocators.LOC_ANY_BODY_LINK, 'Start a project')).get(0));
  }

}
