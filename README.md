# Preparation environment
    install nodejs
    npm install - install all project dependencies to node_modules from package.json
    npm run webdriwer:update - load webdrivers

## How to run UI tests with sh scripts
1. Select environment ( local, QA, PROD, etc) in resources/common/environmentList.ts
2. Select list of tests that you want to run in scenarioList.js
3. ```npm run e2e:run``` - run all test from scenarioList.js with protractor configuration
- There is automatic report generator script which done on protractor.afterLunch()

## For Angular projects
For Angular projects to run tests you can use ```npm run e2e```, ```npm run e2e:prod``` , ```npm run e2e:dev```, ```npm run e2e:watch```
No need to use ```npm run e2e:run```, you can delete ```npm run e2e:run```, ```npm run webdriver:start```, ```npm run webdriver:update```, ```npm run protractor```, ```npm run sleep```

## Framework info
- file to choose scenarios to run -  scenarioList.js
- file with protractor configuration - protractor.conf.js
- DIR flows - here all tests scripts in TS stored + common tests scenarios
- DIR fwk - frameworks files ( entry point to the tests)
- DIR impl - impl of all Page objects in the project
- DIR impl/po - All Page Objects
- DIR impl/locators - all Page Objects locators are stored here
- DIR reports - all html reports stored here( git ignored )
- DIR resources - json files with TestProperties + environmentList.json file

- DIR reportSample contain report sample to preview. Delete it later
- Video with run example https://youtu.be/lV4GEow5Ya0
- Video with report sample https://youtu.be/fWzKC0JY8xQ
