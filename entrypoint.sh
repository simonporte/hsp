#!/bin/sh

# Copy the assets from default if missing
# Alpine cp does not have -n switch,
# so using -i and piping n as answer as many times as needed
yes n | cp -iR ./www/src/default-assets/* ./www/assets &> /dev/null

exec darkhttpd /www/ --no-listing --port 80
