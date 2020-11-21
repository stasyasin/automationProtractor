import { Environment } from '../models/Environment';
import { ENVIRONMENT_LIST } from '../../resources/common/environmentList';

/**
 * TestParameter class to init all necessary parameters
 * + make all initActions like init all objects before tests
 * + to get any parameter through getParam method
 */
export class TestParameter {
  public static data: any = null;
  private static timeStamp: Date = null;
  public static environment: Environment = {} as Environment;

  /**
   * Method to Initialize environment values from /e2e/resources/common/environmentList
   */
  protected static initEnvironment(): void {
    const envConfFile = ENVIRONMENT_LIST;
    this.environment.envName = envConfFile.envName;
    this.environment.url = envConfFile[this.environment.envName].url;
    this.environment.userID = envConfFile[this.environment.envName].userID;
    this.environment.password = envConfFile[this.environment.envName].password;
  }

  /**
   * Common method to include all necessary init methods before test.
   */
  public static initCommonParameters(testProps?: any): void {
    if (!!testProps) {
      this.data = testProps;
    }
    this.timeStamp = new Date();
    this.initEnvironment();
  }

}
