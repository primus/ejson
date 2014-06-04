'use strict';

var read = require('fs').readFileSync
  , path = require('path');

//
// Expose a custom build which only uses globals instead of browserify.
//
module.exports = [
  ';var EJSON = (function () {',
  '"use strict";',

  //
  // EJSON and meteor has a horrible habit of introducing pointless globals
  // a.k.a. writing bad code in general. These variable declarations ensure that
  // we don't have horrible global leaks in our own code.
  //
  'var EJSON, EJSONTest, i, base64Encode, base64Decode, root = {};',

  //
  // Add the required dependencies and include them as full source so we can
  // re-use this code for Node.js as well as on the client.
  //
  read(require.resolve('underscore'), 'utf-8').slice(0, -7) + 'root);',
  'var _ = "undefined" !== typeof exports ? exports._ : root._;',
  read(path.join(__dirname, './vendor/ejson.js'), 'utf-8'),
  read(path.join(__dirname, './vendor/base64.js'), 'utf-8'),

  '  return EJSON;',
  '}).call(this);'
].join('\n');
