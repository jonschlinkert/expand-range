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
