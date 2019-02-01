#!/usr/bin/env bash

# Start the protractor tests
echo "Start the protractor tests"
echo "###########################################"
../node_modules/protractor/bin/protractor ../qaprotractor.conf.js


#Uncomment this command for debugging needs
echo "sleep 20"
echo "###########################################"
#sleep 20
