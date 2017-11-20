#!/bin/bash

set -e # exit when error

yarn examples:ecommerce:build
MODE=build webpack --config webpack.demo.js
