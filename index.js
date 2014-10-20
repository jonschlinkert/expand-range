/*!
 * expand-range <https://github.com/jonschlinkert/expand-range>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';
'use strict';

var digits = require('digits');
var repeat = require('repeat-string');

function isRange(str) {
  return /\.{2}/.test(str);
}

function getRange(str) {
  return /\{(([^\\.]+)\.{2}([^\\}]+))\}/g.exec(str);
}

function pad(number, amount) {
  var num = Math.pow(10, amount);
  return number < num ? ('' + (num + number)).slice(1) : '' + number;
}

function range(start, stop) {
  var padding = String(stop).length;
  var arr = [], i = start - 1;

  while (i++ < stop) {
    arr.push(pad(i, padding));
  }
  return arr;
}

// function expandRange(range) {
//   var start = /^[0-9]+/.exec(range)[0];
//   var end = /[0-9]+$/.exec(range)[0];
//   var zero = start[0] == '0';
//   var len = String(end).length;
//   var i = start;
//   var arr = [];

//   while (i <= end) {
//     if (zero && +i > 0) {
//       i = pad(i, len);
//     }
//     arr.push(i);
//     i++;
//   }
//   return arr.join(',');
// };


console.log(getRange('ab/{0..100}/cd'))
// console.log(range('0', '100'))