#!/bin/sh

echo webhook received!

gatsby build
cp -Tr ../public /var/www/kahvipatel.com/prod-build
