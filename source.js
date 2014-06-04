'use strict';

var read = require('fs').readFileSync
  , path = require('path');

//
// Create a browser stable version of underscore so it can be included in the
// source of the EJSON library.
//
var _ = read(require.resolve('underscore'), 'utf-8').slice(0, -7) + 'root);';

//
// Remove the module.exports of the EJSON library which has been browserified.
//
var EJSON = read(path.join(__dirname, 'index.js'), 'utf-8').slice(16);

//
// Remove the require statement for underscore and replace it with the full
// source of the library.
//
EJSON = EJSON.replace(/var\s\_\s=\srequire\(\"underscore\"\);/, [
  _,
  'var _ = "undefined" !== typeof exports ? exports._ : root._;'
].join(''));

//
// Force a global variable and expose the string.
//
module.exports = ';var EJSON = '+ EJSON;
