'use strict';

var expand = require('minimatch').braceExpand;

module.exports = function (str) {
  return expand('{' + str + '}');
};