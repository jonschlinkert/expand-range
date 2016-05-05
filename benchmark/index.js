'use strict';

var Suite = require('benchmarked');
var suite = new Suite({
  fixtures: 'fixtures/*.js',
  code: 'code/*.js',
  cwd: __dirname
});

suite.run();
// suite.dryRun(function(code, fixture) {
//   console.log();
//   console.log(code.key);
//   console.log('[' + code.run.apply(code, fixture.content).join(',') + ']');
// });
