describe('EJSON', function () {
  'use strict';

  var chai = require('chai')
    , expect = chai.expect;

  chai.config.includeStack = true;

  var EJSON = require('../');

  it('is keyOrderSensitive', function () {
    expect(EJSON.equals({
      a: {b: 1, c: 2},
      d: {e: 3, f: 4}
    }, {
      d: {f: 4, e: 3},
      a: {c: 2, b: 1}
    })).to.equal(true);

    expect(EJSON.equals({
      a: {b: 1, c: 2},
      d: {e: 3, f: 4}
    }, {
      a: {c: 2, b: 1},
      d: {f: 4, e: 3}
    }, { keyOrderSensitive: true })).to.equal(false);

    expect(EJSON.equals({
      a: {}
    }, {
      a: {b: 2}
    }, { keyOrderSensitive: true })).to.equal(false);

    expect(EJSON.equals({
      a: {b: 2}
    }, {
      a: {}
    }, { keyOrderSensitive: true })).to.equal(false);
  });

  it('supports nesting and literal', function () {
    var d = new Date()
      , obj = {$date: d};

    var eObj = EJSON.toJSONValue(obj)
      , roundTrip = EJSON.fromJSONValue(eObj);

    expect(obj).to.deep.equal(roundTrip);
  });

  it('equals correctly', function () {
    expect(EJSON.equals({a: 1, b: 2, c: 3}, {a: 1, c: 3, b: 2})).to.equal(true);
    expect(EJSON.equals({a: 1, b: 2}, {a: 1, c: 3, b: 2})).to.equal(false);
    expect(EJSON.equals({a: 1, b: 2, c: 3}, {a: 1, b: 2})).to.equal(false);
    expect(EJSON.equals({a: 1, b: 2, c: 3}, {a: 1, c: 3, b: 4})).to.equal(false);
    expect(EJSON.equals({a: {}}, {a: {b:2}})).to.equal(false);
    expect(EJSON.equals({a: {b:2}}, {a: {}})).to.equal(false);
  });

  it('equality and falsiness', function () {
    expect(EJSON.equals(null, null)).to.equal(true);
    expect(EJSON.equals(undefined, undefined)).to.equal(true);
    expect(EJSON.equals({foo: "foo"}, null)).to.equal(false);
    expect(EJSON.equals(null, {foo: "foo"})).to.equal(false);
    expect(EJSON.equals(undefined, {foo: "foo"})).to.equal(false);
    expect(EJSON.equals({foo: "foo"}, undefined)).to.equal(false);
  });

  it('clones', function () {
    function cloneTest(x, identical) {
      var y = EJSON.clone(x);

      expect(y).to.deep.equal(x);
      expect(x === y).to.equal(!!identical);
    }

    cloneTest(null, true);
    cloneTest(undefined, true);
    cloneTest(42, true);
    cloneTest("asdf", true);
    cloneTest([1, 2, 3]);
    cloneTest([1, "fasdf", {foo: 42}]);
    cloneTest({x: 42, y: "asdf"});

    function testCloneArgs(/*arguments*/) {
      var clonedArgs = EJSON.clone(arguments);
      expect(clonedArgs).to.deep.equal([1, 2, "foo", [4]]);
    }

    testCloneArgs(1, 2, "foo", [4]);
  });
});
