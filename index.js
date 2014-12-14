/*!
 * expand-range <https://github.com/jonschlinkert/expand-range>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fill = require('fill-range');

module.exports = function expandRange(str, fn) {
  var args = str.split('..');

  if (args.length === 1) {
    return args;
  }

  return fill.apply(fill, args.concat(fn));
};
