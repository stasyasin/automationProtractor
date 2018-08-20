#!/usr/bin/env bash

# Update webdriver-manager
echo "Update webdriver-manager"
echo "###########################################"
../node_modules/protractor/bin/webdriver-manager update

# Start webdriver-manager
echo "Start webdriver-manager"
echo "###########################################"
(../node_modules/protractor/bin/webdriver-manager start --seleniumPort 4444 &)
# Wait for port 4444 to be listening connections
#while ! nc -z 127.0.0.1 4444; do sleep 1; done

# Start the protractor tests
echo "Start the protractor tests"
echo "###########################################"
(sleep 5 && ../node_modules/protractor/bin/protractor ../qaprotractor.conf.js &)


#Uncomment this command for debugging needs
echo "sleep 100"
echo "###########################################"
(sleep 100 &)
