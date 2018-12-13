import { browser } from 'protractor';
import { MainPOChecks } from '../impl/checks/MainPOChecks';
import { TestParameter } from '../common/TestParameter';
import { LoginPOChecks } from '../impl/checks/LoginPOChecks';
import { LoginPOActions } from '../impl/actions/LoginPOActions';
import { MainPOActions } from '../impl/actions/MainPOActions';

export abstract class CommonScenario {

  private readonly testParameterFilePath: string;

  constructor(testParameterFilePath?: string) {
    this.testParameterFilePath = testParameterFilePath;
  }

  abstract checkTestGoals(): void;

  abstract performTest(): void;

  pageSetup(): void {
    beforeAll(() => {
      // Fill TestParameter object
      TestParameter.setConfFile(this.testParameterFilePath);
      TestParameter.initCommonParameters();
      // Open Start page using URL from EnvironmentList
      browser.ignoreSynchronization = true;
      browser.get(TestParameter.environment.url);
      // Check that browser opened URL
      expect(browser.getTitle()).toBeDefined();
      const loginPOChecks = new LoginPOChecks();
      loginPOChecks.isSignInLinkDisplayed().then((elementDisplayed) => {
        expect(elementDisplayed).toBeTruthy('Sign In Link is not displayed, Login page was not loaded');
      });
    });
  }

  performLogin(): void {
    const loginPOChecks = new LoginPOChecks();
    const loginPOActions = new LoginPOActions();
    const mainPOChecks = new MainPOChecks();
    loginPOChecks.isSignInLinkDisplayed().then((elementDisplayed) => {
      expect(elementDisplayed).toBeTruthy('Sign In Link is not displayed, Login page was not loaded');
    });
    // possible TestParameter.getUserId() if want to take credentials from TestProperty json
    loginPOActions.performLogin(TestParameter.environment.userID, TestParameter.environment.password);
    mainPOChecks.isStartProjectLinkDisplayed().then((elementDisplayed) => {
      expect(elementDisplayed).toBeTruthy('Start Project link is not displayed, login was not successful');
    });
  }

  performLogOut(): void {
    const mainPOActions = new MainPOActions();
    const loginPOChecks = new LoginPOChecks();
    mainPOActions.clickLogout();
    loginPOChecks.isSignInLinkDisplayed().then((elementDisplayed) => {
      expect(elementDisplayed).toBeTruthy('Sign In Link is not displayed, Login page was not loaded');
    });
    browser.refresh();
  }

  run(...args: any[]): void {
    const testName = args[0];
    describe(testName, () => {
      this.pageSetup();
      it('Perform Login actions', () => {
        this.performLogin();
      });

      this.performTest();

      it('Check test goals && Perform Logout actions', () => {
        this.checkTestGoals();
        this.performLogOut();
      });
    });
  }

}
