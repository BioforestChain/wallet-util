var hash = exports;

hash.utils = require('./src/utils.js');
hash.common = require('./src/common.js');
hash.sha = require('./src/sha.js');
hash.ripemd = require('./src/ripemd.js');
hash.hmac = require('./src/hmac.js');

// Proxy hash functions to the main object
hash.sha1 = hash.sha.sha1;
hash.sha256 = hash.sha.sha256;
hash.sha224 = hash.sha.sha224;
hash.sha384 = hash.sha.sha384;
hash.sha512 = hash.sha.sha512;
hash.ripemd160 = hash.ripemd.ripemd160;
