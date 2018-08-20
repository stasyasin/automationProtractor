import {Environment} from '../dataObjects/Environment';
import fs = require('fs-extra');

/**
 * TestParameter class to init all necessary parameters
 * + make all initActions like init all objects before tests
 * + to get any parameter through getParam method
 */
export class AbstractTestParameter {
  public static data: any = null;
  public static confFile: any = null;
  public static timeStamp: Date = null;
  public static environment: Environment = new Environment();

  /**
   * Method to Initialize environment values from resources/common/environmentList
   */

  protected static initEnvironment(): void {
    let that = this;
    let env = this.data['testScenarioParameters']['environment']['value'];
    let confFile: string = '../resources/common/environmentList.json';
    fs.readFile(confFile, {encoding: 'utf-8'}, function (err: any, r: string): void {
      if (err) {
        throw Error(err);
      }
      let data = JSON.parse(r);
      let overValue = (data['OVER'] !== undefined && data['OVER']['override'] !== undefined && data['OVER']['override'] === 'true') ?
        data['OVER']['overValue'] : env;
      that.environment.envName = overValue;
      for (let t in data) {
        if (t === that.environment.envName) {
          that.environment.url = data[t]['url'];
          that.environment.userID = data[t]['userID'];
          that.environment.password = data[t]['password'];
        }
      }
    });
  }

  /**
   * Common method to include all necessary init methods before test.
   */
  public static initCommonParameters(): void {
    this.data = JSON.parse(fs.readFileSync(this.confFile.confFile, 'utf-8'));
    this.timeStamp = new Date();
    this.initEnvironment();
  }

  /**
   * Method to get any parameter from config file
   * @param: string corresponding to the param key in the config file
   * @return: string
   */
  public static getParam(keyword: string): string {
    return this.data[keyword];
  }

}
