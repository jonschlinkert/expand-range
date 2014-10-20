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
    expand('{1..3}').should.eql(['1', '2', '3']);
    expand('{5..8}').should.eql(['5', '6', '7', '8']);
    expand('a{1..3}b{1..4}d').should.eql(['a1b1d', 'a1b2d', 'a1b3d', 'a1b4d', 'a2b1d', 'a2b2d', 'a2b3d', 'a2b4d', 'a3b1d', 'a3b2d', 'a3b3d', 'a3b4d']);
    // expand('a{1..3}b{1..3}d').should.eql(['a1b1d', 'a1b2d', 'a1b3d', 'a2b1d', 'a2b2d', 'a2b3d', 'a3b1d', 'a3b2d', 'a3b3d']);
    // expand('a{1..5}b').should.eql(['a1b', 'a2b', 'a3b', 'a4b', 'a5b']);
    // expand('a{00..05}b').should.eql(['a00b', 'a01b', 'a02b', 'a03b', 'a04b', 'a05b']);
  });
});
