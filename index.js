/*!
 * expand-range <https://github.com/jonschlinkert/expand-range>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fillRange = require('fill-range');

module.exports = function expandRange(str, fn) {
  var args = str.split('..');
  if (args.length < 1) {
    return str;
  }

  return fillRange.apply(fillRange, args.concat(fn));
};
