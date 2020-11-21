import { TestSuite } from './TestSuite';

/**
 * Campaign class, to use in global .html report
 */
export interface Campaign {
  name: string;
  testSuites: TestSuite[];
}
