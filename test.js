/*!
 * expand-range <https://github.com/jonschlinkert/expand-range>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var expand = require('./');


describe('expand range', function () {
  it('should return the number as an array if no range is specified', function () {
    expand('1').should.eql(['1']);
  });

  it('should throw when the first arg is not a string.', function () {
    (function() {
      expand();
    }).should.throw('expand-range expects a string.')
  });

  it('should expand numerical ranges', function () {
    expand('1..3').should.eql(['1', '2', '3']);
    expand('5..8').should.eql(['5', '6', '7', '8']);
  });

  it('should expand negative ranges', function () {
    expand('0..-5').should.eql(['0', '-1', '-2', '-3', '-4', '-5']);
  });

  it('should expand alphabetical ranges', function () {
    expand('a..e').should.eql(['a', 'b', 'c', 'd', 'e']);
    expand('A..E').should.eql(['A', 'B', 'C', 'D', 'E']);
  });

  it('should fill in numerical ranges', function () {
    expand('1..3').should.eql(['1', '2', '3']);
    expand('5..8').should.eql(['5', '6', '7', '8']);
  });

  it('should fill in numerical ranges when numbers are passed as strings', function () {
    expand('1..3').should.eql(['1', '2', '3']);
    expand('5..8').should.eql(['5', '6', '7', '8']);
  });

  it('should fill in negative ranges', function () {
    expand('0..-5').should.eql([ '0', '-1', '-2', '-3', '-4', '-5' ]);
    expand('0..-5').should.eql([ '0', '-1', '-2', '-3', '-4', '-5' ]);
    expand('9..-4').should.eql([ '9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '-1', '-2', '-3', '-4' ]);
    expand('-10..-1').should.eql([ '-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1' ]);
  });

  it('should fill in rangines using the given increment', function () {
    expand('1..10').should.eql([ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]);
    expand('1..10..1').should.eql([ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]);
    expand('1..10..2').should.eql([ '1', '3', '5', '7', '9' ]);
    expand('1..10..2').should.eql([ '1', '3', '5', '7', '9' ]);
    expand('1..10..2').should.eql([ '1', '3', '5', '7', '9' ]);
    expand('1..20..2').should.eql([ '1', '3', '5', '7', '9', '11', '13', '15', '17', '19' ]);
    expand('1..20..20').should.eql([ '1' ]);
    expand('10..1..-2').should.eql([ '10', '8', '6', '4', '2' ]);
    expand('10..1..2').should.eql([ '10', '8', '6', '4', '2' ]);
    expand('1..9').should.eql([ '1', '2', '3', '4', '5', '6', '7', '8', '9' ]);
    expand('2..10..2').should.eql([ '2', '4', '6', '8', '10' ]);
    expand('2..10..1').should.eql([ '2', '3', '4', '5', '6', '7', '8', '9', '10' ]);
    expand('2..10..2').should.eql([ '2', '4', '6', '8', '10' ]);
    expand('2..10..3').should.eql([ '2', '5', '8' ]);
  });

  it('should fill in negative ranges using the given increment', function () {
    expand('-1..-10..-2').should.eql([ '-1', '-3', '-5', '-7', '-9' ]);
    expand('-1..-10..2').should.eql([ '-1', '-3', '-5', '-7', '-9' ]);
    expand('10..1..-2').should.eql([ '10', '8', '6', '4', '2' ]);
    expand('-10..-2..2').should.eql([ '-10', '-8', '-6', '-4', '-2' ]);
    expand('-2..-10..1').should.eql([ '-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '-10' ]);
    expand('-2..-10..2').should.eql([ '-2', '-4', '-6', '-8', '-10' ]);
    expand('-2..-10..3').should.eql([ '-2', '-5', '-8' ]);
    expand('-9..9..3').should.eql([ '-9', '-6', '-3', '0', '3', '6', '9' ]);
  });

  it('should fill in negative ranges using the given increment', function () {
    expand('1..10..2').should.eql([ '1', '3', '5', '7', '9' ]);
    expand('-1..-10..2').should.eql([ '-1', '-3', '-5', '-7', '-9' ]);
    expand('-1..-10..-2').should.eql([ '-1', '-3', '-5', '-7', '-9' ]);
    expand('10..1..-2').should.eql([ '10', '8', '6', '4', '2' ]);
    expand('10..1..2').should.eql([ '10', '8', '6', '4', '2' ]);
    expand('1..20..2').should.eql([ '1', '3', '5', '7', '9', '11', '13', '15', '17', '19' ]);
    expand('1..20..20').should.eql([ '1' ]);
  });

  it('should fill in alphabetical ranges', function () {
    expand('a..e').should.eql(['a', 'b', 'c', 'd', 'e']);
    expand('A..E').should.eql(['A', 'B', 'C', 'D', 'E']);
    expand('E..A').should.eql(['E', 'D', 'C', 'B', 'A']);
  });

  it('should use increments with alphabetical ranges', function () {
    expand('a..e..2').should.eql(['a','c', 'e']);
    expand('E..A..2').should.eql(['E', 'C', 'A']);
  });
  describe('when a custom function is used for expansions', function () {
    it('should expose the current value as the first param.', function () {
      var res = expand('1..5', function (val, isNumber, pad, i) {
        return String(val);
      });
      res.should.eql(['1', '2', '3', '4', '5']);
    });

    it('should expose the `isNumber` boolean as the third param.', function () {
      var res = expand('a..e', function (val, isNumber, pad, i) {
        if (!isNumber) {
          return String.fromCharCode(val);
        }
        return val;
      });
      res.should.eql(['a', 'b', 'c', 'd', 'e']);
    });

    it('should expose any padding as the third param.', function () {
      var res = expand('001..003', function (val, isNumber, pad, i) {
        return pad + val;
      });
      res.should.eql(['001', '002', '003']);
    });

    it('should expose the index as the third param.', function () {
      var res = expand('a..e', function (val, isNumber, pad, i) {
        if (!isNumber) {
          return String.fromCharCode(val) + i;
        }
        return val;
      });
      res.should.eql(['a0', 'b1', 'c2', 'd3', 'e4']);
    });
  });
});
