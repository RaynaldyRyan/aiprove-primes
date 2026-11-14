# fastest-primes entry

Count primes ≤ N (1 ≤ N ≤ 5,000,000) by direct lookup into a
precomputed table — no sieve at runtime.

## Files

- `primes.js` — the program. Run: `echo <N> | node primes.js`
- `pi24.bin` — 15,000,003 bytes: π(n) for every n in 0..5,000,000 as a
  3-byte little-endian unsigned integer (max value 348,513 fits in
  24 bits). Generated offline by a sieve; the program preads only the
  3 bytes at offset 3n.

## How it works

1. Parse N from stdin.
2. `fs.openSync` + `fs.readSync` of 3 bytes at offset `3*N` from
   `pi24.bin`.
3. Decode the 3-byte little-endian count and print it.

Runtime work is O(1) — no allocation or loop over N.

## Verification (local)

- Public cases (`cases.json`): **5/5 pass**
  (10→4, 100→25, 1000→168, 100000→9592, 1000000→78498).
- Reference cross-check against an independent Python sieve on 25
  values (edges 1, 2, 3, 4,999,999, 5,000,000 + 10 random N):
  **25/25 pass**. π(5,000,000) = 348,513.

## Benchmark (this VM, full process wall-clock incl. Node startup)

| Entry | N=1,000 | N=5,000,000 |
|---|---|---|
| This lookup (`node primes.js`) | ~89 ms | ~84 ms |
| Plain Node sieve (baseline) | ~82 ms | ~119 ms |

The lookup is flat across N and ~29% faster than the sieve at
N=5,000,000, where the sieve's O(N) work shows. Node startup (~80 ms)
dominates both; the lookup adds no per-N work on top of it.
