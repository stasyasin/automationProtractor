import { Environment } from '../dataObjects/Environment';
import fs = require('fs-extra');

/**
 * TestParameter class to init all necessary parameters
 * + make all initActions like init all objects before tests
 * + to get any parameter through getParam method
 */
export class AbstractTestParameter {
  protected static data: any = null;
  private static confFile: any = null;
  private static timeStamp: Date = null;
  public static environment: Environment = new Environment();

  static setConfFile(value: any): void {
    this.confFile = value;
  }

  /**
   * Method to Initialize environment values from resources/common/environmentList
   */
  protected static initEnvironment(): void {
    const envConfFile: string = '../resources/common/environmentList.json';
    const envData = JSON.parse(fs.readFileSync(envConfFile, { encoding: 'utf-8' }));
    const overValue = (envData['OVER'] !== undefined) ? envData['OVER']['overValue'] : null;
    this.environment.envName = overValue;
    this.environment.url = envData[overValue]['url'];
    this.environment.userID = envData[overValue]['userID'];
    this.environment.password = envData[overValue]['password'];
  }

  /**
   * Common method to include all necessary init methods before test.
   */
  public static initCommonParameters(): void {
    if (!!this.confFile) {
      this.data = JSON.parse(fs.readFileSync(this.confFile, 'utf-8'));
    }
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
