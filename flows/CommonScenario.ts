import { browser } from 'protractor';
import { MainPOChecks } from '../impl/checks/MainPOChecks';
import { TestParameter } from '../common/TestParameter';
import { LoginPOChecks } from '../impl/checks/LoginPOChecks';
import { LoginPOActions } from '../impl/actions/LoginPOActions';
import { MainPOActions } from '../impl/actions/MainPOActions';

export abstract class CommonScenario {

  private readonly testParameterFilePath: string;

  abstract async checkTestGoals(): Promise<void>;

  abstract performTest(): void;

  pageSetup(testParameterFilePath: string): void {
    beforeAll(async () => {
      // Fill TestParameter object
      TestParameter.initCommonParameters(testParameterFilePath);
      // Open Start page using URL from EnvironmentList
      browser.ignoreSynchronization = true;
      browser.get(TestParameter.environment.url);
      // Check that browser opened URL
      expect(browser.getTitle()).toBeDefined();
      const loginPOChecks = new LoginPOChecks();
      expect(await loginPOChecks.isSignInLinkDisplayed()).toBeTruthy(
        'Sign In Link is not displayed, Login page was not loaded');
    });
  }

  async performLogin(): Promise<void> {
    const loginPOChecks = new LoginPOChecks();
    const loginPOActions = new LoginPOActions();
    const mainPOChecks = new MainPOChecks();
    expect(await loginPOChecks.isSignInLinkDisplayed()).toBeTruthy('Sign In Link is not displayed, Login page was not loaded');
    // possible TestParameter.getUserId() if want to take credentials from TestProperty json
    loginPOActions.performLogin(TestParameter.environment.userID, TestParameter.environment.password);
    expect(await mainPOChecks.isStartProjectLinkDisplayed()).toBeTruthy(
      'Start Project link is not displayed, login was not successful');
  }

  async performLogOut(): Promise<void> {
    const mainPOActions = new MainPOActions();
    const loginPOChecks = new LoginPOChecks();
    mainPOActions.clickLogout();
    expect(await loginPOChecks.isSignInLinkDisplayed()).toBeTruthy(
      'Sign In Link is not displayed, Login page was not loaded');
    browser.refresh();
  }

  run(testName: string, testParameterFilePath: string): void {
    describe(testName, async () => {
      this.pageSetup(testParameterFilePath);

      it('Perform Login actions', async () => {
        await this.performLogin();
      });

      this.performTest();

      it('Check test goals && Perform Logout actions', async () => {
        await this.checkTestGoals();
        await this.performLogOut();
      });
    });
  }

}
