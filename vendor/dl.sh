#!/usr/bin/env bash

set -e

BASE_URL=https://raw.githubusercontent.com/meteor/meteor/devel/packages

cd "$(dirname "${BASH_SOURCE[0]}")"
rm {base64,ejson,stringify}.js
wget $BASE_URL/{base64/base64,ejson/{ejson,stringify}}.js
