import { TestParameter } from '../../../common/TestParameter';
import { MainPOActions } from '../../../impl/actions/MainPOActions';
import { CommonScenario } from '../../CommonScenario';
import { RepositoryPOChecks } from '../../../impl/checks/RepositoryPOChecks';
import { CheckUtils } from '../../../fwk/utils/CheckUtils';

export class SampleTestSecond extends CommonScenario {

  public static testName: string = 'SampleTestSecond';
  public static testParameterFilePath: string = './resources/e2eSanity/sampleTest/SampleTestSecond.json';

  performTest(): void {
    it('Search repository with name/owner from TestParameters', async () => {
      this.mainPOActions.searchRepository(TestParameter.getRepName(), TestParameter.getRepOwner());
      expect(await this.repositoryPOChecks.isSummaryButtonDisplayed()).toBeTruthy(
        'Summary Button is not displayed, repository was not found');
    });
  }

  async checkTestGoals(): Promise<void> {
    expect(await CheckUtils.getPageURL()).toContain(TestParameter.getRepName(), 'Url is wrong');
    expect(await CheckUtils.getPageURL()).toContain(TestParameter.getRepOwner(), 'Url is wrong');
  }

}

new SampleTestSecond().run(SampleTestSecond.testName, SampleTestSecond.testParameterFilePath);
