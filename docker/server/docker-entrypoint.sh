#!/bin/bash

cd /var/www/wosido

# if [ ! -d /var/www/wosido/node_modules ]; then
  npm cache clean -f  &&  npm install
# fi;

npm run start:dev
