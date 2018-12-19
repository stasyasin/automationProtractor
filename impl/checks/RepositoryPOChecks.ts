import { element } from 'protractor';
import { CheckUtils } from '../../fwk/utils/CheckUtils';
import { WaitUtils } from '../../fwk/utils/WaitUtils';
import { IRepositoryPOChecks } from '../interfaces/IRepositoryPOChecks';
import { RepositoryPOLocators } from '../locators/RepositoryPOLocators';

export class RepositoryPOChecks implements IRepositoryPOChecks {

  async isSummaryButtonDisplayed(): Promise<boolean> {
    WaitUtils.waitForElementPresent(element.all(RepositoryPOLocators.LOC_REP_SUMMARY_BUTTON).get(0));
    return await CheckUtils.isElementDisplayed(element.all(RepositoryPOLocators.LOC_REP_SUMMARY_BUTTON).get(0));
  }
}
