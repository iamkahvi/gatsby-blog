#!/bin/sh

echo webhook received!

gatsby build
cp -Tr public ../site-build
