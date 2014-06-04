'use strict';

var path = require('path')
  , fs = require('fs');

//
// Retrieve the source code of all required assets to compile them the actual
// full source of the EJSON source.
//
var source = [
  'module.exports = (function () {',
  '"use strict";',

  //
  // EJSON and meteor has a horrible habit of introducing pointless globals
  // a.k.a. writing bad code in general. These variable declarations ensure that
  // we don't have horrible global leaks in our own code.
  //
  'var EJSON, EJSONTest, i, base64Encode, base64Decode, root = {};',

  'var _ = require("underscore");',
  fs.readFileSync(path.join(__dirname, './vendor/ejson.js'), 'utf-8'),
  fs.readFileSync(path.join(__dirname, './vendor/base64.js'), 'utf-8'),

  '  return EJSON;',
  '}).call(this);'
].join('\n');

fs.writeFileSync(__dirname + '/index.js', source);
