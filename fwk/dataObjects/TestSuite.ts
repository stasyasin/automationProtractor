/**
 * TestSuite class, to use in global .html report
 */
export class TestSuite {
  name: string;
  tests: string;
  skipped: string;
  failures: string;
  time: string;
  status: string;
  link: string;

  constructor(name: string, tests: string, skipped: string, failures: string, time: string, link: string) {
    this.name = name;
    this.tests = tests;
    this.skipped = skipped;
    this.failures = failures;
    this.time = time;
    this.link = link;
    if ((parseInt(failures) > 0) || (parseInt(skipped) > 0)) {
      this.status = 'Failed';
    } else {
      this.status = 'Passed';
    }
  }

}
