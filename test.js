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

describe('special characters:', function() {
  it('should repeat the first arg `n` times:', function() {
    assert.deepEqual(expand('a..3..+'), ['a', 'a', 'a']);
    assert.deepEqual(expand('abc..2..+'), ['abc', 'abc']);
    assert.deepEqual(expand('a~~~b..5..+'), ['a~~~b', 'a~~~b', 'a~~~b', 'a~~~b', 'a~~~b']);
  });

  it('should collapse values when `>` is passed:', function() {
    assert.deepEqual(expand('a..e..>'), ['abcde']);
    assert.deepEqual(expand('A..E..>'), ['ABCDE']);
    assert.deepEqual(expand('E..A..>'), ['EDCBA']);
    assert.deepEqual(expand('5..8..>'), ['5678']);
    assert.deepEqual(expand('2..20..2>'), ['2468101214161820']);
    assert.deepEqual(expand('2..20..>2'), ['2468101214161820']);
  });

  it('should randomize using the first two args when `?` is passed:', function() {
    assert(!/[\w\d]{6}/.test(expand('A0..5..?')));
    assert(!/\d{5}/.test(expand('A..5..?')));

    assert(/[\w\d]{5}/.test(expand('A0..5..?')));
    assert(/.{5}/.test(expand('*..5..?')));
    assert(/[^\W]{10}/.test(expand('aA0..10..?')));
  });

  it('should join the array using `|` as the separator:', function() {
    assert.deepEqual(expand('a..c..|'), ['[a-c]']);
    assert.deepEqual(expand('a..e..2|'), ['(a|c|e)']);
    assert.deepEqual(expand('a..e..|2'), ['(a|c|e)']);
  });
});

describe('character classes:', function() {
  it('should return a string for a regex range when `true` is passed:', function() {
    assert.deepEqual(expand('a..e', true), ['[a-e]']);
    assert.deepEqual(expand('0..9', true), ['[0-9]']);
    assert.deepEqual(expand('A..Z..5', true), ['(A|F|K|P|U|Z)']);
    assert.deepEqual(expand('E..A', true), ['(E|D|C|B|A)']);
  });

  it('should return a string for a regex when `~` or `|` are passed:', function() {
    assert.deepEqual(expand('A..P', '~5'), ['(A|F|K|P)']);
  });

  it('should make a logical or when the range is out-of-order:', function() {
    assert.deepEqual(expand('c..a', '~'), ['(c|b|a)']);
    assert.deepEqual(expand('c..a', '|'), ['(c|b|a)']);
    assert.deepEqual(expand('1023..1021', true), ['(1023|1022|1021)']);
    assert.deepEqual(expand('1..10', '~'), ['(1|2|3|4|5|6|7|8|9|10)']);
  });

  it('should prefix the regex string when a `prefix` is passed on options:', function() {
    assert.deepEqual(expand('c..a', '~', {regexPrefix: '?!'}), ['(?!c|b|a)']);
    assert.deepEqual(expand('1..10', '~', {regexPrefix: '?:'}), ['(?:1|2|3|4|5|6|7|8|9|10)']);
  });

  it('should return the string when arguments are invalid:', function() {
    assert.equal(expand('1..1..2..1'), '1..1..2..1');
  });

  it('should return null for invalid patterns:', function() {
    assert.equal(expand('1.1..2.1'), null);
    assert.equal(expand('1.2..2'), null);
    assert.equal(expand('1.20..2'), null);
    assert.equal(expand('1..0f'), null);
    assert.equal(expand('1..10..ff'), null);
    assert.equal(expand('1..10.f'), null);
    assert.equal(expand('1..10f'), null);
    assert.equal(expand('1..20..2f'), null);
    assert.equal(expand('1..20..f2'), null);
    assert.equal(expand('1..2f..2'), null);
    assert.equal(expand('1..ff..2'), null);
    assert.equal(expand('1..ff'), null);
    assert.equal(expand('1..f'), null);
    assert.equal(expand('f..1'), null);
  });
});

describe('when a custom function is used for expansions', function() {
  it('should expose the current value as the first param.', function() {
    var res = expand('1..5', function(val, isNumber, pad, i) {
      return String(val);
    });
    assert.deepEqual(res, ['1', '2', '3', '4', '5']);
  });

  it('should expose the `isNumber` boolean as the third param.', function() {
    var res = expand('a..e', function(val, isNumber, pad, i) {
      if (!isNumber) {
        return String.fromCharCode(val);
      }
      return val;
    });
    assert.deepEqual(res, ['a', 'b', 'c', 'd', 'e']);
  });

  it('should expose any padding as the third param.', function() {
    var res = expand('001..003', function(val, isNumber, pad, i) {
      return pad + val;
    });
    assert.deepEqual(res, ['001', '002', '003']);
  });

  it('should expose the index as the third param.', function() {
    var res = expand('a..e', function(val, isNumber, pad, i) {
      if (!isNumber) {
        return String.fromCharCode(val) + i;
      }
      return val;
    });
    assert.deepEqual(res, ['a0', 'b1', 'c2', 'd3', 'e4']);
  });
});
