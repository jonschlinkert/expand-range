'use strict';

var expand = require('brace-expansion');

module.exports = function (str) {
  return expand('{' + str + '}');
};