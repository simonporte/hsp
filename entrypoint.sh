#!/bin/sh

# Copy the assets from default if missing
for i in ./www/src/default-assets/*
do
  # Alpine cp does not have -n switch,
  # so using -i and piping n as answer
  echo n | cp -i $i ./www/assets/`basename $i` &> /dev/null
done

exec darkhttpd /www/ --no-listing --port 80
