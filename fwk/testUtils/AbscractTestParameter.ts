import { Environment } from '../dataObjects/Environment';
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
    let envConfFile: string = '../resources/common/environmentList.json';
    fs.readFile(envConfFile, { encoding: 'utf-8' }, function(err: any, r: string): void {
      if (err) {
        throw Error(err);
      }
      let envData = JSON.parse(r);
      let overValue = (envData['OVER'] !== undefined) ? envData['OVER']['overValue'] : null;
      that.environment.envName = overValue;
      for (let t in envData) {
        if (t === that.environment.envName) {
          that.environment.url = envData[t]['url'];
          that.environment.userID = envData[t]['userID'];
          that.environment.password = envData[t]['password'];
        }
      }
    });
  }

  /**
   * Common method to include all necessary init methods before test.
   */
  public static initCommonParameters(): void {
    this.data = JSON.parse(fs.readFileSync(this.confFile, 'utf-8'));
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
