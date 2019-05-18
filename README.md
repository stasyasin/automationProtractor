# Preparation environment
    install nodejs
    npm install - install all project dependencies to node_modules from package.json
    npm run webdriwer:update - load webdrivers

## How to run UI tests with sh scripts
1. Select environment ( local, QA, PROD, etc) in resources/common/environmentList.json
2. Select list of tests that you want to run in scenarioList.js
3. npm run sh-build - translation .ts files to .js files( into generated folder)
5. npm run testrun - run all test from scenarioList.js with protractor configuration
6. npm run sh-report - to create global HTML report

## How to run UI tests with gulp
1. Select environment ( local, QA, PROD, etc) in resources/common/environmentList.json
2. Select list of tests that you want to run in scenarioList.js
3. gulp build - translation .ts files to .js files( into generated folder)
5. gulp run - run all test from scenarioList.js with protractor configuration
6. gulp report - to create global HTML report

## Framework info
- file to choose scenarios to run -  scenarioList.js
- file with protractor configuration - qaprotractor.conf.js
- DIR common - here common objects and TestParameters stored
- DIR flows - here all tests scripts in TS stored + common tests scenarios
- DIR fwk - frameworks files ( entry point to the tests)
- DIR generated - all generated js files + d.ts mapping stored here
- DIR impl - impl of all Page objects in the project
- DIR impl/actions - All actions Page Objects
- DIR impl/checks - All checks Page Objects
- DIR impl/interfaces - interfaces for action and checks PO here including specification for each method
- DIR impl/locators - all Page Objects locators are stored here
- DIR reports - all html reports stored here( git ignored )
- DIR resources - json files with TestProperties + environmentList.json file
- DIR utils - waitUtils, etc

- DIR reportSample contain report sample to preview. Delete it later
- Video with run example https://youtu.be/lV4GEow5Ya0
- Video with report sample https://youtu.be/fWzKC0JY8xQ
