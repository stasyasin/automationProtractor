import { browser } from 'protractor';
import { MainPOChecks } from '../impl/checks/MainPOChecks';
import { TestParameter } from '../common/TestParameter';
import { LoginPOChecks } from '../impl/checks/LoginPOChecks';
import { LoginPOActions } from '../impl/actions/LoginPOActions';
import { MainPOActions } from '../impl/actions/MainPOActions';
import fs = require('fs');

const timeout = global['implicitlyWait'];

export abstract class CommonScenario {

  private environmentList: string = '../resources/common/environmentList.json';
  private readonly testParameterFilePath: string;

  constructor(testParameterFilePath: string) {
    this.testParameterFilePath = testParameterFilePath;
  }

  abstract initValues(testParameterFilePath);

  checkTestGoals(): void {
  }

  performTest(): void {
  }

  pageSetup(): void {
    beforeAll(() => {
      // Fill TestParameter object
      this.initValues(this.testParameterFilePath);
      // Open Start page using URL from EnvironmentList
      browser.ignoreSynchronization = true;
      this.loadPage();
    });

    it('Check Start Page was Opened', (done) => {
      // Check that browser opened URL
      expect(browser.getTitle()).toBeDefined();
      done();
    });
  }

  private loadPage() {
    let dataEnv = JSON.parse(fs.readFileSync(this.environmentList, 'utf-8'));
    let overValue = (dataEnv['OVER'] !== undefined) ?
      dataEnv['OVER']['overValue'] : null;
    let url = (overValue !== null) ? dataEnv[overValue]['url'] : null;
    browser.get(url);
  }

  performLogin(): void {
    const loginPOChecks = new LoginPOChecks();
    const loginPOActions = new LoginPOActions();
    const mainPOChecks = new MainPOChecks();
    loginPOChecks.isSignInLinkDisplayed().then((elementDisplayed) => {
      expect(elementDisplayed).toBeTruthy('Sign In Link is not displayed, Login page was not loaded');
    });
    loginPOActions.performLogin(TestParameter.environment.userID, TestParameter.environment.password); // possible TestParameter.getUserId(), TestParameter.getPassword() if want to take credentials from TestProperty json
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
      it('Perform Login actions', (done) => {
        this.performLogin();
        done();
      });

      this.performTest();

      it('Check Goals of the tests', (done) => {
        this.checkTestGoals();
        this.performLogOut();
        done();
      });
    });
  }

}
