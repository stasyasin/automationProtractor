import { by, element } from 'protractor';
import { CheckUtils } from '../../fwk/utils/CheckUtils';
import { IMainPOChecks } from '../interfaces/IMainPOChecks';
import { WaitUtils } from '../../fwk/utils/WaitUtils';
import { CommonPOLocators } from '../locators/CommonPOLocators';

export class MainPOChecks implements IMainPOChecks {

  async isStartProjectLinkDisplayed(): Promise<boolean> {
    WaitUtils.waitForElementPresent(element.all(by.cssContainingText(
      CommonPOLocators.LOC_ANY_BODY_LINK, 'Start a project')).get(0));
    return await CheckUtils.isElementDisplayed(element.all(by.cssContainingText(
      CommonPOLocators.LOC_ANY_BODY_LINK, 'Start a project')).get(0));
  }

}
