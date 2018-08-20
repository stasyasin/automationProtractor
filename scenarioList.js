var buildFilePathE2ESanity = function (scenarioName) {
  return './generated/flows/e2eSanity/' + scenarioName + '.js';
};

exports.e2eSanity = [
  'sampleTest/SampleTest',
  'sampleTest/SampleTestSecond',
].map(buildFilePathE2ESanity);


