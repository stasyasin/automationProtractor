import testPageLoader = require ('../fwk/testUtils/TestPageLoader');
import {browser} from 'protractor';
import {MainPOChecks} from '../impl/checks/MainPOChecks';
import {TestParameter} from '../common/TestParameter';
import {LoginPOChecks} from '../impl/checks/LoginPOChecks';
import {LoginPOActions} from '../impl/actions/LoginPOActions';
import {MainPOActions} from '../impl/actions/MainPOActions';

const timeout = global['implicitlyWait'];

export abstract class CommonScenario {

  public launcher: testPageLoader.TestPageLoader;
  public _isLoad: boolean;

  constructor(configFilePath: string) {
    this.launcher = new testPageLoader.TestPageLoader(configFilePath);
    this._isLoad = false;
  }

  abstract initValues(startPage);

  checkTestGoals(): void {
  }

  performTest(): void {
  }

  pageSetup(): void {
    beforeAll(() => {
      // Fill TestParameter object
      this.initValues(this.launcher);
      // Open Start page using URL from TestParameter
      browser.ignoreSynchronization = true;
      if (!this._isLoad) {
        this.launcher.loadPage();
      }
    });

    it('Check Start Page was Opened', (done) => {
      // Check that browser opened URL
      expect(browser.getTitle()).toBeDefined();
      done();
    });
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
