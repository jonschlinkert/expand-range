/*!
 * expand-range <https://github.com/jonschlinkert/expand-range>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var expand = require('./');


describe('expand range', function () {
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

  describe('when a custom function is used for expansions', function () {
    it('should expose the current value as the first param.', function () {
      var res = expand('1..5', function (val, isLetter, i) {
        return val;
      });
      res.should.eql([1, 2, 3, 4, 5]);
    });

    it('should expose the `isLetter` boolean as the second param.', function () {
      var res = expand('a..e', function (val, isLetter, i) {
        if (isLetter) {
          return String.fromCharCode(val);
        }
        return val;
      });
      res.should.eql(['a', 'b', 'c', 'd', 'e']);
    });

    it('should expose the index as the third param.', function () {
      var res = expand('a..e', function (val, isLetter, i) {
        if (isLetter) {
          return String.fromCharCode(val) + i;
        }
        return val;
      });
      res.should.eql(['a0', 'b1', 'c2', 'd3', 'e4']);
    });
  });
});
