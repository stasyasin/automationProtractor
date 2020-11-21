var buildFilePathE2E = function (scenarioName) {
  // return './generated/flows/e2e/' + scenarioName + '.js';
  return `./flows/e2e/**/*${scenarioName}.e2e-spec.ts`;
};

exports.e2e = [
  'SampleTest',
  'SampleTestSecond',
].map(buildFilePathE2E);


