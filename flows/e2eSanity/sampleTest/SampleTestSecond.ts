import { TestParameter } from '../../../common/TestParameter';
import { MainPOActions } from '../../../impl/actions/MainPOActions';
import { CommonScenario } from '../../CommonScenario';
import { RepositoryPOChecks } from '../../../impl/checks/RepositoryPOChecks';
import { CheckUtils } from '../../../fwk/utils/CheckUtils';

export class SampleTestSecond extends CommonScenario {

  public static testName: string = 'SampleTestSecond';

  constructor() {
    super('../resources/e2eSanity/sampleTest/SampleTestSecond.json');
  }

  performTest(): void {
    it('Search repository with name/owner from TestParameters', () => {
      const mainPOActions = new MainPOActions();
      const repositoryPOChecks = new RepositoryPOChecks();
      mainPOActions.searchRepository(TestParameter.getRepName(), TestParameter.getRepOwner());
      repositoryPOChecks.isSummaryButtonDisplayed().then((isDisplayed) => {
        expect(isDisplayed).toBeTruthy('Summary Button is not displayed, repository was not found');
      });
    });
  }

  checkTestGoals(): void {
    CheckUtils.getPageURL().then((url) => {
      expect(url).toContain(TestParameter.getRepName(), 'Url is wrong');
      expect(url).toContain(TestParameter.getRepOwner(), 'Url is wrong');
    });
  }

}

new SampleTestSecond().run(SampleTestSecond.testName);
