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
  // Add a Meteor stub, when fibers are not supported on you system meteor
  // automatically sets this function to a nope function. We're going to do the
  // same here as there are small parts of the code that call this function.
  //
  'var Meteor = { _noYieldsAllowed:function nope(f) { return f(); }};',

  //
  // EJSON and meteor has a horrible habit of introducing pointless globals
  // a.k.a. writing bad code in general. These variable declarations ensure that
  // we don't have horrible global leaks in our own code.
  //
  'var EJSON, EJSONTest, i, Base64, root = {};',

  'var _ = require("underscore");',
  fs.readFileSync(path.join(__dirname, './vendor/base64.js'), 'utf-8'),
  fs.readFileSync(path.join(__dirname, './vendor/ejson.js'), 'utf-8'),

  '  return EJSON;',
  '}).call(this);'
].join('\n');

fs.writeFileSync(__dirname + '/index.js', source);
