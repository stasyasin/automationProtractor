import * as CheckUtils from '../../fwk/utils/CheckUtils';
import * as WaitUtils from '../../fwk/utils/WaitUtils';
import { RepositoryPOLocators } from '../locators/RepositoryPOLocators';
import { getElement } from '../../fwk/utils/ElementUtils';

export class RepositoryPO {

  async isSummaryButtonDisplayed(): Promise<boolean> {
    await WaitUtils.waitForElementPresent(getElement(RepositoryPOLocators.LOC_REP_SUMMARY_BUTTON));
    return await CheckUtils.isElementDisplayed(getElement(RepositoryPOLocators.LOC_REP_SUMMARY_BUTTON));
  }
}
