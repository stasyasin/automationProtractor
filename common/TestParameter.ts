import fs = require('fs-extra');
import { AbstractTestParameter } from '../fwk/testUtils/AbscractTestParameter';

/**
 * TestParameter class to init all necessary parameters
 * + make all initActions like init all objects before tests
 * + to get any parameter through getParam method
 */
export class TestParameter extends AbstractTestParameter {


  /**
   * Override Method to add additional init instances if necessary here
   */
  // public static initCommonParameters(): void {
  //   this.data = JSON.parse(fs.readFileSync(this.confFile, 'utf-8'));
  //   this.timeStamp = new Date();
  //   this.initEnvironment();
  // }

  public static getUserId(): string {
    if (typeof this.data['testScenarioParameters']['loginParameters']['userId'] === undefined) {
      return null;
    }
    return this.data['testScenarioParameters']['loginParameters']['userId']['value'];
  }

  public static getPassword(): string {
    if (typeof this.data['testScenarioParameters']['loginParameters']['password'] === undefined) {
      return null;
    }
    return this.data['testScenarioParameters']['loginParameters']['password']['value'];
  }

  public static getRepName(): string {
    if (typeof this.data['testScenarioParameters']['repositoryParameters']['repName'] === undefined) {
      return null;
    }
    return this.data['testScenarioParameters']['repositoryParameters']['repName']['value'];
  }

  public static getRepOwner(): string {
    if (typeof this.data['testScenarioParameters']['repositoryParameters']['repOwner'] === undefined) {
      return null;
    }
    return this.data['testScenarioParameters']['repositoryParameters']['repOwner']['value'];
  }

}
