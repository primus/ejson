'use strict';

module.exports = {
  //
  // When fibers are not supported on you system Meteor automatically sets this
  // function to a nope function. We're going to do the same here as there are
  // small parts of the code that call this function.
  //
  _noYieldsAllowed(f) {
    return f();
  }
};
