'use strict';

var expand = require('../..');

module.exports = function(str) {
  if (Array.isArray(str)) {
    return expand.apply(null, str);
  }
  var res = expand(str);
  console.log(res);
  return res;
};
