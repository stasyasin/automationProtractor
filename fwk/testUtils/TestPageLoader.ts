import fs = require('fs');
import {browser} from 'protractor';

/**
 * Class to load test page based on TestParameters.
 * OVER parameter true is to run all tests on the same environment, false is to run each test on it's own environment
 */
export class TestPageLoader {

  public confFile: string;
  private url: string;
  private environmentList: string = '../resources/common/environmentList.json';

  constructor(configFile: string) {
    this.confFile = configFile;
  }

  loadPage(): void {
    let that: TestPageLoader = this;
    let data = JSON.parse(fs.readFileSync(this.confFile, 'utf-8'));
    let env = data.testScenarioParameters.environment.value;
    let dataEnv = JSON.parse(fs.readFileSync(this.environmentList, 'utf-8'));
    let overValue = (dataEnv['OVER'] !== undefined && dataEnv['OVER']['override'] !== undefined &&
      dataEnv['OVER']['override'] === 'true') ? dataEnv['OVER']['overValue'] : null;
    that.url = (overValue !== null) ? dataEnv[overValue]['url'] : dataEnv[env]['url'];
    browser.get(that.url);
  }

}
