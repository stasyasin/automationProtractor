import { TestSuite } from './TestSuite';

/**
 * Campaign class, to use in global .html report
 */
export class Campaign {
  name: string;
  testSuites: TestSuite[];

  constructor(name: string, testSuites: TestSuite[]) {
    this.name = name;
    this.testSuites = testSuites;
  }

}
