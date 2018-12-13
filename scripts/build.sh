#!/usr/bin/env bash

# Remove generated folder
echo "Remove generated folder"
echo "###########################################"
rm -rf ../generated

# Generate js files from ts to generated folder
echo "Generate js files from ts to generated folder"
echo "###########################################"
../node_modules/typescript/bin/tsc

#Uncomment this command for debugging needs
#echo "sleep 10"
#echo "###########################################"
#sleep 10


