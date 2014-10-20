/*!
 * expand-range <https://github.com/jonschlinkert/expand-range>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var isNumber = require('is-number');


function hasRange(str) {
  return /\.{2}/.test(str);
}

function getRange(str) {
  return /\{(([^\\.]+)\.{2}([^\\}]+))\}/g.exec(str);
}

function pad(number, amount) {
  var num = Math.pow(10, amount);
  return number < num ? ('' + (num + number)).slice(1) : '' + number;
}

function padding(a, b) {
  var pad = /^[\w-_]*(0+)/.exec(a);
  if (pad == null) {
    return false;
  }
  var diff = b.length - pad[0].length;
  return (diff) !== 0 ? false : true;
}

function coerce(val) {
  var ch = parseInt(val, 10);
  return val == ch /* 01 */
    ? ch
    : val.charCodeAt(0); /* Aa */
}


function alpha(val) {
  return String.fromCharCode(val);
}

function range(start, stop, special) {
  var len = String(stop).length;
  var arr = [], i = start - 1;

  while (i++ < stop) {
    if (typeof special === 'function') {
      arr.push(special(i));
    } else if (special === 'pad') {
      arr.push(pad(i, len));
    } else if (special === 'alpha') {
      arr.push(alpha(i));
    } else {
      arr.push(String(i));
    }
  }

  return arr;
}

var expandRange = module.exports = function expandRange(str, fn) {
  var match = getRange(str);
  if (match == null) {
    return str;
  }

  var m1 = match[2];
  var m2 = match[3];

  var number = isNumber(parseInt(m1));

  var a = coerce(m1);
  var b = coerce(m2);

  if (typeof fn === 'function') {
    return range(a, b, fn);
  } else if (number === false) {
    return range(a, b, 'alpha');
  } else if (padding(m1, m2)) {
    return range(a, b, 'pad');
  }

  return range(a, b);
};


var aa = expandRange('ab/{0..100}/cd');
console.log(aa);
var a = expandRange('ab/{000..100}/cd');
var b = expandRange('ab/{A..Z}/cd');
console.log(a);
console.log(b);
// console.log(range('0', '100'))
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
