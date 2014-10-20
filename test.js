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

  it('should honor padding', function () {
    expand('00..05').should.eql(['00', '01', '02', '03', '04', '05']);
    expand('01..03').should.eql(['01', '02', '03']);
    expand('000..005').should.eql(['000', '001', '002', '003', '004', '005']);
  });

  it('should expand alphabetical ranges', function () {
    expand('a..e').should.eql(['a', 'b', 'c', 'd', 'e']);
    expand('A..E').should.eql(['A', 'B', 'C', 'D', 'E']);
  });

  it('should use a custom function for expansions.', function () {
    var range = expand('a..e', function (str, i) {
      return String.fromCharCode(str) + i;
    });
    range.should.eql(['a0', 'b1', 'c2', 'd3', 'e4']);
  });
});
