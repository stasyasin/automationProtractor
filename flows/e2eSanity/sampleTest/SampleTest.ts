import { TestParameter } from '../../../common/TestParameter';
import { MainPOActions } from '../../../impl/actions/MainPOActions';
import { CommonScenario } from '../../CommonScenario';
import { RepositoryPOChecks } from '../../../impl/checks/RepositoryPOChecks';
import { AbstractChecks } from '../../../fwk/abstractPO/AbstractChecks';

export class SampleTest extends CommonScenario {

  public static testName: string = 'SampleTest';

  constructor() {
    super('../resources/e2eSanity/sampleTest/SampleTest.json');
  }

  performTest(): void {
    it('Search repository with name/owner from TestParameters', (done) => {
      const mainPOActions = new MainPOActions();
      const repositoryPOChecks = new RepositoryPOChecks();
      mainPOActions.searchRepository(TestParameter.getRepName(), TestParameter.getRepOwner());
      repositoryPOChecks.isSummaryButtonDisplayed().then((isDisplayed) => {
        expect(isDisplayed).toBeTruthy('Summary Button is not displayed, repository was not found');
      });
      done();
    });
  }

  checkTestGoals(): void {
    AbstractChecks.getPageURL().then((url) => {
      expect(url).toContain(TestParameter.getRepName(), 'Url is wrong');
      expect(url).toContain(TestParameter.getRepOwner(), 'Url is wrong');
    });
  }

}

new SampleTest().run(SampleTest.testName);
