/**
 * TestSuite class, to use in global .html report
 */
export interface TestSuite {
  name: string;
  tests: string;
  skipped: string;
  failures: string;
  time: string;
  status: string;
  link: string;
}
