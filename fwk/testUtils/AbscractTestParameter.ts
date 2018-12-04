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
    const envConfFile: string = '../resources/common/environmentList.json';
    fs.readFile(envConfFile, { encoding: 'utf-8' }, (err: any, r: string): void => {
      if (err) {
        throw Error(err);
      }
      const envData = JSON.parse(r);
      const overValue = (envData['OVER'] !== undefined) ? envData['OVER']['overValue'] : null;
      this.environment.envName = overValue;
      for (const t in envData) {
        if (t === this.environment.envName) {
          this.environment.url = envData[t]['url'];
          this.environment.userID = envData[t]['userID'];
          this.environment.password = envData[t]['password'];
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
