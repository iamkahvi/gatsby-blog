#!/bin/sh

echo building gatsby
gatsby build

echo copying to prod
rsync -azP /Users/Kahvi/Developer/gatsby-blog/public/ root@142.93.152.73:/var/www/kahvipatel.com/prod-build
