#!/usr/bin/env bash

# Remove generated folder
echo "Remove generated folder"
echo "###########################################"
rm -rf ../generated

# Generate js files from ts to generated folder
echo "Generate js files from ts to generated folder"
echo "###########################################"
npx tsc -p ./tsconfig.json




