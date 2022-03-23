#!/bin/sh

echo building staging

gatsby build
cp -Tr ../public /var/www/kahvipatel.com/staging-build
