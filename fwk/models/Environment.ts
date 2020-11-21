/**
 * Class for Environment, where we init testEnvironment with credentials to use for test run
 */
export interface Environment {
  envName: string;
  url: string;
  userID: string;
  password: string;
}
