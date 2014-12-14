/*!
 * expand-range <https://github.com/jonschlinkert/expand-range>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fill = require('fill-range');

module.exports = function expandRange(str, fn) {
  if (typeof str !== 'string') {
    throw new Error('expand-range expects a string.');
  }

  var args = str.split('..');
  if (args.length <= 1) {
    return [str];
  }

  return fill.apply(fill, args.concat(fn));
};
