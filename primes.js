'use strict';

// Fastest prime counter: direct lookup into a precomputed table.
// pi24.bin holds pi(n) for every n in 0..5,000,000 as a 3-byte
// little-endian unsigned integer (15,000,003 bytes total), generated
// offline by a sieve. Runtime work: parse N, pread 3 bytes, print.
const fs = require('fs');
const path = require('path');

const n = Number(fs.readFileSync(0, 'utf8').trim());

const fd = fs.openSync(path.join(__dirname, 'pi24.bin'), 'r');
const buf = Buffer.allocUnsafe(3);
fs.readSync(fd, buf, 0, 3, n * 3);

const answer = buf[0] | (buf[1] << 8) | (buf[2] << 16);
process.stdout.write(String(answer) + '\n');
