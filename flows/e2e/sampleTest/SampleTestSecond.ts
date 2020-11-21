import { CommonScenario } from '../../CommonScenario';
import { TestRunOptions } from '../../../fwk/models/TestRunOptions';
import { SAMPLE_TEST_SECOND_PROP } from '../../../resources/e2e/sampleTest/SampleTestSecondProp';
import { TestParameter } from '../../../fwk/testUtils/TestParameter';

export class SampleTestSecond extends CommonScenario {

  public static testName: string = 'SampleTestSecond';
  public static options: TestRunOptions = {
    testName: 'SampleTest',
    testProps: SAMPLE_TEST_SECOND_PROP,
    login: true
  };

  performTest(): void {
    it('Search repository with name/owner from TestParameters', async () => {
      await this.mainPO.searchRepository(TestParameter.data.repositoryParameters.repName,
        TestParameter.data.repositoryParameters.repOwner);
      expect(await this.repositoryPO.isSummaryButtonDisplayed()).toBeTruthy(
        'Summary Button is not displayed, repository was not found');
    });
  }
}

new SampleTestSecond().run(SampleTestSecond.options);
