import { CommonScenario } from '../../CommonScenario';
import { TestRunOptions } from '../../../fwk/models/TestRunOptions';
import { SAMPLE_TEST_PROP } from '../../../resources/e2e/sampleTest/SampleTestProp';
import { TestParameter } from '../../../fwk/testUtils/TestParameter';

export class SampleTestE2eSpec extends CommonScenario {

  public static options: TestRunOptions = {
    testName: 'SampleTest',
    testProps: SAMPLE_TEST_PROP,
    login: false
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

new SampleTestE2eSpec().run(SampleTestE2eSpec.options);
