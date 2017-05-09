/*!
 * expand-range <https://github.com/jonschlinkert/expand-range>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License
 */

'use strict';

require('mocha');
var assert = require('assert');
var expand = require('./');

describe('expand range', function() {
  it('should return the number as an array if no range is specified', function() {
    assert.deepEqual(expand('1'), ['1']);
  });

  it('should throw when the first arg is not a string.', function() {
    assert.throws(function() {
      expand();
    }, /expand-range expects a string/);
  });

  it('should expand numerical ranges', function() {
    assert.deepEqual(expand('1..3'), ['1', '2', '3']);
    assert.deepEqual(expand('5..8'), ['5', '6', '7', '8']);
  });

  it('should expand negative ranges', function() {
    assert.deepEqual(expand('0..-5'), ['0', '-1', '-2', '-3', '-4', '-5']);
  });

  it('should expand alphabetical ranges', function() {
    assert.deepEqual(expand('a..e'), ['a', 'b', 'c', 'd', 'e']);
    assert.deepEqual(expand('A..E'), ['A', 'B', 'C', 'D', 'E']);
  });

  it('should fill in numerical ranges', function() {
    assert.deepEqual(expand('1..3'), ['1', '2', '3']);
    assert.deepEqual(expand('5..8'), ['5', '6', '7', '8']);
  });

  it('should fill in numerical ranges when numbers are passed as strings', function() {
    assert.deepEqual(expand('1..3'), ['1', '2', '3']);
    assert.deepEqual(expand('5..8'), ['5', '6', '7', '8']);
  });

  it('should fill in negative ranges', function() {
    assert.deepEqual(expand('0..-5'), [ '0', '-1', '-2', '-3', '-4', '-5' ]);
    assert.deepEqual(expand('0..-5'), [ '0', '-1', '-2', '-3', '-4', '-5' ]);
    assert.deepEqual(expand('9..-4'), [ '9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '-1', '-2', '-3', '-4' ]);
    assert.deepEqual(expand('-10..-1'), [ '-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1' ]);
  });

  it('should fill in rangines using the given increment', function() {
    assert.deepEqual(expand('1..10'), [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]);
    assert.deepEqual(expand('1..10..1'), [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]);
    assert.deepEqual(expand('1..10..2'), [ '1', '3', '5', '7', '9' ]);
    assert.deepEqual(expand('1..10..2'), [ '1', '3', '5', '7', '9' ]);
    assert.deepEqual(expand('1..10..2'), [ '1', '3', '5', '7', '9' ]);
    assert.deepEqual(expand('1..20..2'), [ '1', '3', '5', '7', '9', '11', '13', '15', '17', '19' ]);
    assert.deepEqual(expand('1..20..20'), [ '1' ]);
    assert.deepEqual(expand('10..1..-2'), [ '10', '8', '6', '4', '2' ]);
    assert.deepEqual(expand('10..1..2'), [ '10', '8', '6', '4', '2' ]);
    assert.deepEqual(expand('1..9'), [ '1', '2', '3', '4', '5', '6', '7', '8', '9' ]);
    assert.deepEqual(expand('2..10..2'), [ '2', '4', '6', '8', '10' ]);
    assert.deepEqual(expand('2..10..1'), [ '2', '3', '4', '5', '6', '7', '8', '9', '10' ]);
    assert.deepEqual(expand('2..10..2'), [ '2', '4', '6', '8', '10' ]);
    assert.deepEqual(expand('2..10..3'), [ '2', '5', '8' ]);
  });

  it('should fill in negative ranges using the given increment', function() {
    assert.deepEqual(expand('-1..-10..-2'), [ '-1', '-3', '-5', '-7', '-9' ]);
    assert.deepEqual(expand('-1..-10..2'), [ '-1', '-3', '-5', '-7', '-9' ]);
    assert.deepEqual(expand('10..1..-2'), [ '10', '8', '6', '4', '2' ]);
    assert.deepEqual(expand('-10..-2..2'), [ '-10', '-8', '-6', '-4', '-2' ]);
    assert.deepEqual(expand('-2..-10..1'), [ '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '-10' ]);
    assert.deepEqual(expand('-2..-10..2'), [ '-2', '-4', '-6', '-8', '-10' ]);
    assert.deepEqual(expand('-2..-10..3'), [ '-2', '-5', '-8' ]);
    assert.deepEqual(expand('-9..9..3'), [ '-9', '-6', '-3', '0', '3', '6', '9' ]);
  });

  it('should fill in negative ranges using the given increment', function() {
    assert.deepEqual(expand('1..10..2'), [ '1', '3', '5', '7', '9' ]);
    assert.deepEqual(expand('-1..-10..2'), [ '-1', '-3', '-5', '-7', '-9' ]);
    assert.deepEqual(expand('-1..-10..-2'), [ '-1', '-3', '-5', '-7', '-9' ]);
    assert.deepEqual(expand('10..1..-2'), [ '10', '8', '6', '4', '2' ]);
    assert.deepEqual(expand('10..1..2'), [ '10', '8', '6', '4', '2' ]);
    assert.deepEqual(expand('1..20..2'), [ '1', '3', '5', '7', '9', '11', '13', '15', '17', '19' ]);
    assert.deepEqual(expand('1..20..20'), [ '1' ]);
  });

  it('should fill in alphabetical ranges', function() {
    assert.deepEqual(expand('a..e'), ['a', 'b', 'c', 'd', 'e']);
    assert.deepEqual(expand('A..E'), ['A', 'B', 'C', 'D', 'E']);
    assert.deepEqual(expand('E..A'), ['E', 'D', 'C', 'B', 'A']);
  });

  it('should use increments with alphabetical ranges', function() {
    assert.deepEqual(expand('a..e..2'), ['a','c', 'e']);
    assert.deepEqual(expand('E..A..2'), ['E', 'C', 'A']);
  });
});

describe('character classes:', function() {
  it('should return a string for a regex range when `true` is passed:', function() {
    assert.deepEqual(expand('a..e', true), '[a-e]');
    assert.deepEqual(expand('0..9', true), '[0-9]');
    assert.deepEqual(expand('A..Z..5', true), '(A|F|K|P|U|Z)');
    assert.deepEqual(expand('E..A', true), '[A-E]');
  });


  it('should flip order when a sequential range is backwards', function() {
    assert.deepEqual(expand('1023..1021', true), '102[1-3]');
  });

  it('should return the string when arguments are invalid:', function() {
    assert.equal(expand('1..1..2..1'), '1..1..2..1');
  });

  it('should return null for invalid patterns:', function() {
    assert.deepEqual(expand('1.1..2.1'), []);
    assert.deepEqual(expand('1.2..2'), []);
    assert.deepEqual(expand('1.20..2'), []);
    assert.deepEqual(expand('1..0f'), []);
    assert.deepEqual(expand('1..10..ff'), []);
    assert.deepEqual(expand('1..10.f'), []);
    assert.deepEqual(expand('1..10f'), []);
    assert.deepEqual(expand('1..20..2f'), []);
    assert.deepEqual(expand('1..20..f2'), []);
    assert.deepEqual(expand('1..2f..2'), []);
    assert.deepEqual(expand('1..ff..2'), []);
    assert.deepEqual(expand('1..ff'), []);
  });
});

describe('when a custom function is used for expansions', function() {
  it('should expose the current value being iterated over', function() {
    var res = expand('1..5', function(val, a, b, step, idx, arr, options) {
      return String(val);
    });
    assert.deepEqual(res, ['1', '2', '3', '4', '5']);
  });

  it('should expose options', function() {
    var res = expand('001..003', function(val, a, b, step, idx, arr, options) {
      return Array(options.maxLength - String(val).length).join('0') + val;
    });
    assert.deepEqual(res, ['001', '002', '003']);
  });

  it('should expose options.isNumber', function() {
    var res = expand('a..e', function(val, a, b, step, idx, arr, options) {
      if (options.isNumber) {
        return String.fromCharCode(val);
      }
      return val;
    });
    assert.deepEqual(res, ['a', 'b', 'c', 'd', 'e']);
  });

  it('should expose the index', function() {
    var res = expand('a..e', function(val, a, b, step, idx, arr, options) {
      return String.fromCharCode(String(a)) + (idx - 1);
    });
    assert.deepEqual(res, ['a0', 'b1', 'c2', 'd3', 'e4']);
  });
});
