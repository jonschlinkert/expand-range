/*!
 * expand-range <https://github.com/jonschlinkert/expand-range>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var fill = require('fill-range');

module.exports = function expandRange(str, fn) {
  if (typeof str !== 'string') {
    throw new TypeError('expand-range expects a string.');
  }

  var args = str.split('..');
  var len = args.length;
  var makeRe;

  if (typeof fn === 'boolean') {
    makeRe = fn;
    fn = null;
  }

  if (len === 2 && makeRe) {
    return ['[' + args.join('-') + ']'];
  }

  if (len === 3 && makeRe) {
    args[2] = args[2] + '|';
    return fill.apply(fill, args);
  }

  if (len <= 1) {
    return [str];
  }

  return fill.apply(fill, args.concat(fn));
};
