/*!
 * expand-range <https://github.com/jonschlinkert/expand-range>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var extend = require('extend-shallow');
var fill = require('fill-range');

module.exports = function expandRange(str, options, fn) {
  if (typeof str !== 'string') {
    throw new TypeError('expand-range expects a string.');
  }

  if (typeof options === 'function') {
    fn = options;
    options = undefined;
  }

  // shallow clone options, to ensure we
  // don't mutate the object upstream
  var opts = extend({}, options);

  if (typeof fn === 'function') {
    opts.transform = fn;
  }

  if (typeof options === 'boolean') {
    opts.makeRe = true;
  }

  // create arguments to pass to fill-range
  var segs = str.split('..');
  var len = segs.length;
  if (len > 3) { return str; }

  // if only one segment, it can't expand so return it
  if (len === 1) { return segs; }

  // if fn is "true", tell fill-range to regexify the string
  if (fn === true) {
    opts.toRegex = true;
    fn = undefined;
  }

  // wrap the result in parentheses, when regexified and necessary
  opts.capture = true;
  segs.push(opts);

  return fill.apply(null, segs);
};
