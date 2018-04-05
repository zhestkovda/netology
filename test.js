const assert = require('assert');
var a = 5;
var b = 6;
var c = a;
assert(true);

assert.deepEqual(a,c);
assert.deepStrictEqual(a,c);