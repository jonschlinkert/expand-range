# expand-range [![NPM version](https://img.shields.io/npm/v/expand-range.svg?style=flat)](https://www.npmjs.com/package/expand-range) [![NPM monthly downloads](https://img.shields.io/npm/dm/expand-range.svg?style=flat)](https://npmjs.org/package/expand-range) [![NPM total downloads](https://img.shields.io/npm/dt/expand-range.svg?style=flat)](https://npmjs.org/package/expand-range) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/expand-range.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/expand-range)

> Fast, bash-like range expansion. Expand a range of numbers or letters, uppercase or lowercase. Used by [micromatch](https://github.com/jonschlinkert/micromatch).

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save expand-range
```

## Example usage

```js
var expand = require('expand-range');
expand('start..end..step', options);

// examples
console.log(expand('1..3')) //=> ['1', '2', '3']
console.log(expand('1..10..3')) //=> [ '1', '4', '7', '10' ]
```

**Params**

* `start`: the number or letter to start with
* `end`: the number or letter to end with
* `step`: (optional) the step/increment to use. works with letters and numbers.
* `options`: Options object to pass to [fill-range](https://github.com/jonschlinkert/fill-range), or a transform function (see [fill-range](https://github.com/jonschlinkert/fill-range) readme for details and documentation)

This library wraps [fill-range](https://github.com/jonschlinkert/fill-range) to support range expansion using `..` separated strings. See [fill-range](https://github.com/jonschlinkert/fill-range) for the full list of options and features.

**Examples**

```js
expand('a..e')
//=> ['a', 'b', 'c', 'd', 'e']

expand('a..e..2')
//=> ['a', 'c', 'e']

expand('A..E..2')
//=> ['A', 'C', 'E']

expand('1..3')
//=> ['1', '2', '3']

expand('0..-5')
//=> [ '0', '-1', '-2', '-3', '-4', '-5' ]

expand('-9..9..3')
//=> [ '-9', '-6', '-3', '0', '3', '6', '9' ])

expand('-1..-10..-2')
//=> [ '-1', '-3', '-5', '-7', '-9' ]

expand('1..10..2')
//=> [ '1', '3', '5', '7', '9' ]
```

### Custom function

Optionally pass a custom function as the second argument:

```js
expand('a..e', function (val, isNumber, pad, i) {
  if (!isNumber) {
    return String.fromCharCode(val) + i;
  }
  return val;
});
//=> ['a0', 'b1', 'c2', 'd3', 'e4']
```

## Benchmarks

```sh
Benchmarking: (4 of 4)
 · alpha-lower
 · alpha-upper
 · padded
 · range

# benchmark/fixtures/alpha-lower.js (29 bytes)
  brace-expansion x 105,234 ops/sec ±0.65% (87 runs sampled)
  expand-range x 364,206 ops/sec ±1.08% (90 runs sampled)
  minimatch x 93,343 ops/sec ±1.61% (86 runs sampled)

  fastest is expand-range

# benchmark/fixtures/alpha-upper.js (29 bytes)
  brace-expansion x 94,729 ops/sec ±0.49% (89 runs sampled)
  expand-range x 347,926 ops/sec ±1.11% (83 runs sampled)
  minimatch x 89,997 ops/sec ±1.10% (87 runs sampled)

  fastest is expand-range

# benchmark/fixtures/padded.js (33 bytes)
  brace-expansion x 9,948 ops/sec ±0.99% (85 runs sampled)
  expand-range x 209,741 ops/sec ±8.85% (83 runs sampled)
  minimatch x 9,125 ops/sec ±0.95% (85 runs sampled)

  fastest is expand-range

# benchmark/fixtures/range.js (29 bytes)
  brace-expansion x 75,911 ops/sec ±1.63% (85 runs sampled)
  expand-range x 525,728 ops/sec ±1.63% (85 runs sampled)
  minimatch x 69,066 ops/sec ±0.55% (86 runs sampled)

  fastest is expand-range

```

## History

### v2.0.0

**Changes**

* Special `step` characters are no longer supported, as the same thing can be accomplished with a custom transform function.
* The signature in the [transform function](https://github.com/jonschlinkert/fill-range#optionstransform) has changed. See [fill-range](https://github.com/jonschlinkert/fill-range) for more details.

## About

### Related projects

* [braces](https://www.npmjs.com/package/braces): Fast, comprehensive, bash-like brace expansion implemented in JavaScript. Complete support for the Bash 4.3 braces… [more](https://github.com/micromatch/braces) | [homepage](https://github.com/micromatch/braces "Fast, comprehensive, bash-like brace expansion implemented in JavaScript. Complete support for the Bash 4.3 braces specification, without sacrificing speed.")
* [fill-range](https://www.npmjs.com/package/fill-range): Fill in a range of numbers or letters, optionally passing an increment or `step` to… [more](https://github.com/jonschlinkert/fill-range) | [homepage](https://github.com/jonschlinkert/fill-range "Fill in a range of numbers or letters, optionally passing an increment or `step` to use, or create a regex-compatible range with `options.toRegex`")
* [micromatch](https://www.npmjs.com/package/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. | [homepage](https://github.com/jonschlinkert/micromatch "Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 58 | [jonschlinkert](https://github.com/jonschlinkert) |
| 1 | [dcohenb](https://github.com/dcohenb) |

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on May 08, 2017._