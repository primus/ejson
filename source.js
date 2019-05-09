'use strict';

const { join } = require('path');
const { readFileSync } = require('fs');

module.exports = readFileSync(join(__dirname, 'bundle.js'), {
  encoding: 'utf8'
});
