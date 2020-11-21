/**
 * TestRunOptions containing:
 * testName - name for describe()
 * testParameterFilePath - path to test property
 * login - indicator of login/logout steps
 */
export interface TestRunOptions {
  testName: string;
  testProps?: {};
  login?: boolean;
}
