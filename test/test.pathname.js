/*!
 * braces <https://github.com/jonschlinkert/braces>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var should = require('should');
var expand = require('../benchmark/libs/pathname-expansion');


describe('minimatch braceExpand', function () {
  describe('brace expansion', function () {
    it('should work around one value', function () {
      expand('a{b}c').should.eql(['abc']);
      expand('a/b/c{d}e').should.eql(['a/b/cde']);
      expand('a/{x,y}/c{d}e').should.eql(['a/x/cde', 'a/y/cde']);
    });

    it('should expand groups', function () {
      expand('a/b/c/{x,y}').should.eql(['a/b/c/x', 'a/b/c/y']);
      expand('a{b,c{d,e},h}x/z').should.eql(['abx/z', 'acdx/z', 'acex/z', 'ahx/z']);
      expand('a{b,c{d,e},h}x{y,z}').should.eql(['abxy', 'abxz', 'acdxy', 'acdxz', 'acexy', 'acexz', 'ahxy', 'ahxz']);
      expand('a{b,c{d,e},{f,g}h}x{y,z}').should.eql(['abxy', 'abxz', 'acdxy', 'acdxz', 'acexy', 'acexz', 'afhxy', 'afhxz', 'aghxy', 'aghxz']);
      expand('a/{x,y}/c{d,e}f.{md,txt}').should.eql(['a/x/cdf.md', 'a/x/cdf.txt', 'a/x/cef.md', 'a/x/cef.txt', 'a/y/cdf.md', 'a/y/cdf.txt', 'a/y/cef.md', 'a/y/cef.txt']);
    });

    it('should expand around globs.', function () {
      expand('a/**/c{d,e}f*.js').should.eql(['a/**/cdf*.js', 'a/**/cef*.js']);
      expand('a/**/c{d,e}f*.{md,txt}').should.eql(['a/**/cdf*.md', 'a/**/cdf*.txt', 'a/**/cef*.md', 'a/**/cef*.txt']);
    });

    it.skip('FAILS: should expand around (incorrect) extra braces.', function () {
      expand('a/{b,c}{d{e,f}g').should.eql(['a/b{deg', 'a/b{dfg', 'a/c{deg', 'a/c{dfg']);
    });
  });

  describe.skip('range expansion', function () {
    it('FAILS: should expand numerical ranges', function () {
      expand('{1..3}').should.eql(['1', '2', '3']);
      expand('{5..8}').should.eql(['5', '6', '7', '8']);
      expand('a{1..3}b{1..4}d').should.eql(['a1b1d', 'a1b2d', 'a1b3d', 'a1b4d', 'a2b1d', 'a2b2d', 'a2b3d', 'a2b4d', 'a3b1d', 'a3b2d', 'a3b3d', 'a3b4d']);
      expand('a{1..3}b{1..3}d').should.eql(['a1b1d', 'a1b2d', 'a1b3d', 'a2b1d', 'a2b2d', 'a2b3d', 'a3b1d', 'a3b2d', 'a3b3d']);
      expand('a{1..5}b').should.eql(['a1b', 'a2b', 'a3b', 'a4b', 'a5b']);
      expand('a{00..05}b').should.eql(['a00b', 'a01b', 'a02b', 'a03b', 'a04b', 'a05b']);
    });
  });
});
