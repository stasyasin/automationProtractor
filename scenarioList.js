var buildFilePathE2ESanity = function (scenarioName) {
  return './generated/flows/e2eSanity/' + scenarioName + '.js'; // ../generated/flows/e2eSanity/' + scenarioName + '.js'; // move outside of scripts folder in case of gulp
};

exports.e2eSanity = [
  'sampleTest/SampleTest',
  'sampleTest/SampleTestSecond',
].map(buildFilePathE2ESanity);


