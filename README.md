# e-json, because EJSON was already taken in npm

`e-json` is Meteor EJSON parser made compatible for Node.js and regular browser
clients. This allows use for real-time systems such as [Primus](https://github.com/3rd-Eden/primus).

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

### License

This module is licensed under MIT. Same as Meteor.js is.
