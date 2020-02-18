#!/bin/bash

cd /var/www/ng-shop

if [ ! -d /var/www/ng-shop/node_modules ]; then
  npm cache clean -f  &&  npm install
fi;

npm run start:dev
