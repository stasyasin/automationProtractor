import { browser } from 'protractor';
import { MainPOChecks } from '../impl/checks/MainPOChecks';
import { TestParameter } from '../common/TestParameter';
import { LoginPOChecks } from '../impl/checks/LoginPOChecks';
import { LoginPOActions } from '../impl/actions/LoginPOActions';
import { MainPOActions } from '../impl/actions/MainPOActions';
import { RepositoryPOChecks } from '../impl/checks/RepositoryPOChecks';

export abstract class CommonScenario {

  private readonly testParameterFilePath: string;

  abstract async checkTestGoals(): Promise<void>;

  abstract performTest(): void;

  loginPOChecks = new LoginPOChecks();
  loginPOActions = new LoginPOActions();
  mainPOChecks = new MainPOChecks();
  mainPOActions = new MainPOActions();
  repositoryPOChecks = new RepositoryPOChecks();

  pageSetup(testParameterFilePath: string): void {
    beforeAll(async () => {
      // Fill TestParameter object
      TestParameter.initCommonParameters(testParameterFilePath);
      // Open Start page using URL from EnvironmentList
      browser.ignoreSynchronization = true;
      browser.get(TestParameter.environment.url);
      // Check that browser opened URL
      expect(browser.getTitle()).toBeDefined();

      expect(await this.loginPOChecks.isSignInLinkDisplayed()).toBeTruthy(
        'Sign In Link is not displayed, Login page was not loaded');
    });
  }

  async performLogin(): Promise<void> {
    expect(await this.loginPOChecks.isSignInLinkDisplayed()).toBeTruthy('Sign In Link is not displayed, Login page was not loaded');
    // possible TestParameter.getUserId() if want to take credentials from TestProperty json
    this.loginPOActions.performLogin(TestParameter.environment.userID, TestParameter.environment.password);
    expect(await this.mainPOChecks.isStartProjectLinkDisplayed()).toBeTruthy(
      'Start Project link is not displayed, login was not successful');
  }

  async performLogOut(): Promise<void> {
    this.mainPOActions.clickLogout();
    expect(await this.loginPOChecks.isSignInLinkDisplayed()).toBeTruthy(
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
