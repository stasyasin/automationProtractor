var buildFilePathE2E = function (scenarioName) {
  return './generated/flows/e2e/' + scenarioName + '.js';
};

exports.e2e = [
  'sampleTest/SampleTest',
  'sampleTest/SampleTestSecond',
].map(buildFilePathE2E);


