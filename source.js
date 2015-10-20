'use strict';

var read = require('fs').readFileSync
  , join = require('path').join;

//
// Expose a custom build which only uses globals instead of browserify.
//
module.exports = [
  ';var EJSON = (function () {',
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

  //
  // Add the required dependencies and include them as full source so we can
  // re-use this code for Node.js as well as on the client.
  //
  read(require.resolve('underscore'), 'utf-8').slice(0, -8) + 'root));',
  'var _ = "undefined" !== typeof exports ? exports._ : root._;',
  read(join(__dirname, 'vendor/base64.js'), 'utf-8'),
  read(join(__dirname, 'vendor/ejson.js'), 'utf-8'),
  read(join(__dirname, 'vendor/stringify.js'), 'utf-8'),

  '  return EJSON;',
  '}).call(this);'
].join('\n');
