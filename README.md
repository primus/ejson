# ejson

[![Version npm](https://img.shields.io/npm/v/ejson.svg?style=flat-square)](https://www.npmjs.com/package/ejson)[![Build Status](https://img.shields.io/github/workflow/status/primus/ejson/CI/master?label=CI&style=flat-square)](https://github.com/primus/ejson/actions?query=workflow%3ACI+branch%3Amaster)[![Coverage Status](https://img.shields.io/coveralls/primus/ejson/master.svg?style=flat-square)](https://coveralls.io/r/primus/ejson?branch=master)[![IRC channel](https://img.shields.io/badge/IRC-irc.freenode.net%23primus-00a8ff.svg?style=flat-square)](https://webchat.freenode.net/?channels=primus)

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

```
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

See the [meteor EJSON documentation](https://docs.meteor.com/#ejson) for more
detailed information.

## License

This module is licensed under MIT. Same as Meteor.js is.
