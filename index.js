'use strict';

var load = require('load')
  , path = require('path')
  , fs = require('fs');

//
// Retrieve the source code of all required assets to compile them the actual
// full source of the EJSON source.
//
var source = [
  ';(function () {',
  '"use strict";',

  //
  // EJSON and meteor has a horrible habit of introducing pointless globals
  // a.k.a. writing bad code in general. These variable declarations ensure that
  // we don't have horrible global leaks in our own code.
  //
  'var EJSON, EJSONTest, i, base64Encode, base64Decode, root = this;',

  //
  // Add the required dependencies and include them as full source so we can
  // re-use this code for Node.js as well as on the client.
  //
  fs.readFileSync(require.resolve('underscore'), 'utf-8'),
  'var _ = "undefined" !== typeof exports ? exports._ : this._;',
  fs.readFileSync('./vendor/ejson.js', 'utf-8'),
  fs.readFileSync('./vendor/base64.js', 'utf-8'),

  '  root.EJSON = EJSON;',
  '}).call(this);'
].join('\n');

//
// The load module loads the source code in to fresh virtual machine. But this
// means that `instanceof` checks are broken because it will check against an
// instance from a different virtual machine which is not the same. In order to
// fix this problem we need to provide the compiler with some pre-defined
// globals that point to our JavaScript object types.
//
var EJSON = load.compiler(source, 'EJSON.js', {
  Uint8Array: Uint8Array,   // Used for instanceof check in ejson.js
  Array: Array,             // Used for instanceof check in ejson.js
  Date: Date,               // Used for instanceof check in ejson.js
}).EJSON;

//
// Expose the source code.
//
EJSON.source = source;

//
// Expose the module.
//
module.exports = EJSON;
