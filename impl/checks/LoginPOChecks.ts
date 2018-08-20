import {by, element} from 'protractor';
import * as webDriver from 'selenium-webdriver';
import {AbstractChecks} from '../../fwk/abstractPO/AbstractChecks';
import {ILoginPOChecks} from '../interfaces/ILoginPOChecks';
import {WaitUtils} from '../../fwk/utils/WaitUtils';
import {CommonPOLocators} from '../locators/CommonPOLocators';

export class LoginPOChecks extends AbstractChecks implements ILoginPOChecks {

    isSignInLinkDisplayed(): webDriver.promise.Promise<boolean> {
        WaitUtils.waitForElementPresent(element.all(CommonPOLocators.LOC_HEADER_LINK).get(2));
        return AbstractChecks.isElementDisplayed(element.all(CommonPOLocators.LOC_HEADER_LINK).get(2));
    }

}
