# ejson

[![Version npm](http://img.shields.io/npm/v/ejson.svg?style=flat-square)](http://browsenpm.org/package/ejson)[![Build Status](http://img.shields.io/travis/primus/ejson/master.svg?style=flat-square)](https://travis-ci.org/primus/ejson)[![Dependencies](https://img.shields.io/david/primus/ejson.svg?style=flat-square)](https://david-dm.org/primus/ejson)[![Coverage Status](http://img.shields.io/coveralls/primus/ejson/master.svg?style=flat-square)](https://coveralls.io/r/primus/ejson?branch=master)[![IRC channel](http://img.shields.io/badge/IRC-irc.freenode.net%23primus-00a8ff.svg?style=flat-square)](http://webchat.freenode.net/?channels=primus)

`ejson` is an extension of JSON to support more types. It supports all JSON-safe
types as well as

- **Date**: It maintains a date instance instead of transforming it to a string.
- **Binary**: `Uint8Array`
- **User defined types**

The `ejson` module is port of Meteor's EJSON parser which has been made
compatible for Node.js and browsers. This way, other 
[real-time libraries](https://github.com/primus/primus) can also make use of
these extensions. 

## Installation

The module is released through npm:

```js
npm install --save ejson
```

## Usage

The API is exactly the same as the API that Meteor provides as it uses exactly
the same code. The most important API's are:

- `EJSON.clone`
- `EJSON.parse`
- `EJSON.stringify`

And some utility methods:

- `EJSON.toJSONValue`
- `EJSON.fromJSONValue`
- `EJSON.isBinary`
- `EJSON.newBinary`
- `EJSON.equals`

See the [meteor EJSON documentation](http://docs.meteor.com/#ejson) for more
detailed information.

## License

This module is licensed under MIT. Same as Meteor.js is.
