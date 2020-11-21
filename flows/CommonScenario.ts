import { browser } from 'protractor';
import { TestRunOptions } from '../fwk/models/TestRunOptions';
import { LoginPO } from '../impl/po/LoginPO';
import { MainPO } from '../impl/po/MainPO';
import { RepositoryPO } from '../impl/po/RepositoryPO';
import { TestParameter } from '../fwk/testUtils/TestParameter';

export abstract class CommonScenario {
  loginPO = new LoginPO();
  mainPO = new MainPO();
  repositoryPO = new RepositoryPO();

  abstract performTest(): void;

  pageSetup(testProps?: any): void {
    beforeAll(async () => {
      // Fill TestParameter object
      TestParameter.initCommonParameters(testProps);
      // Open Start page using URL from EnvironmentList
      browser.waitForAngularEnabled(false);
      browser.get(TestParameter.environment.url);
      // Check that browser opened URL
      expect(browser.getTitle()).toBeDefined();

      expect(await this.loginPO.isSignInLinkDisplayed()).toBeTruthy(
        'Sign In Link is not displayed, Login page was not loaded');
    });
  }

  async performLogin(): Promise<void> {
    expect(await this.loginPO.isSignInLinkDisplayed()).toBeTruthy('Sign In Link is not displayed, Login page was not loaded');
    // possible TestParameter.getUserId() if want to take credentials from TestProperty json
    await this.loginPO.performLogin(TestParameter.environment.userID, TestParameter.environment.password);
    expect(await this.mainPO.isStartProjectLinkDisplayed()).toBeTruthy(
      'Start Project link is not displayed, login was not successful');
  }

  async performLogOut(): Promise<void> {
    await this.mainPO.clickLogout();
    expect(await this.loginPO.isSignInLinkDisplayed()).toBeTruthy(
      'Sign In Link is not displayed, Login page was not loaded');
    browser.refresh();
  }

  run(options: TestRunOptions): void {
    describe(options.testName, async () => {
      this.pageSetup(options.testProps);

      if (options.login) {
        it('Perform Login actions', async () => {
          await this.performLogin();
        });
      }

      this.performTest();

      if (options.login) {
        it('Check test goals && Perform Logout actions', async () => {
          await this.performLogOut();
        });
      }
    });
  }

}
