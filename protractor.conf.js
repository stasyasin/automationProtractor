const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
const { SpecReporter } = require('jasmine-spec-reporter');
const moment = require('moment');
const timeStamp = moment(new Date()).format('YYYY-MM-DD[T]HH[h]mm[m]ss[s]');
const { generateGlobalReports } = require('./fwk/reportUtils/ReporterUtils.js');

const scenarioList = require('./scenarioList');

const specList = [].concat(scenarioList.e2e);


exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: specList,
  shardTestFiles: true,
  maxInstances: 2,
  exclude: [],
  plugins: [{
    path: './mouse-plugin.js' // deactivate to not show mouse moves
  }],

  framework: 'jasmine2',

  jasmineNodeOpts: {
    showColors: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 90 * 1000,
    includeStackTrace: true,
    inVerbose: true,
    realtimeFailure: true
  },

  // To test in multiple browsers
  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
        'args': [
          'incognito', // to run in incognito mode in browser
          // '--headless', // to run in headless mode
          // '--disable-gpu', // to run in headless mode
          // 'window-size=1920,1080', // to run in headless mode
          'disable-web-security',
          '--start-maximized',
          '--disable-web-security',
          '--allow-file-access',
          '--allow-insecure-localhost',
          '--allow-running-insecure-content',
          '--enable-automation'
        ],
        prefs: {
          'profile.managed_default_content_settings.geolocation': 1,
          'profile.managed_default_content_settings.notifications': 1
        }
      },
      specs: specList
    }
  ],

  useAllAngular2AppRoots: true,

  rootElement: 'body',
  allScriptsTimeout: 60 * 1000, // Increased timeout in case of browser issues
  onPrepare: function() {
    // Set ts transpilation
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    browser.manage().timeouts().pageLoadTimeout(40 * 1000);
    global["implicitlyWait"] = 5 * 1000; // timeout to inspect DOM
    browser.manage().timeouts().implicitlyWait(global["implicitlyWait"]);
    // returning the promise makes protractor wait for the reporter config before executing tests
    return browser.getProcessedConfig().then(function (config) {

      // you could use other properties here if you want, such as platform and version
      var browserName = config.capabilities.browserName;

      // Set console reporter
      jasmine.getEnv().addReporter(new SpecReporter({
        spec: {
          displayStacktrace: 'raw'
        }
      }));

      // Set Jasmine2THMLReporter
      jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
        savePath: '.\/reports\/Campaign-' + timeStamp + '\/',
        consolidate: false,
        cleanDestination: false,
        fileName: 'auto',
        fileNameSeparator: '_'
      }));
    });
  },
  afterLaunch() {
    generateGlobalReports();
  }
};
