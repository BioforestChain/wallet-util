"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RipeMd160 = require("../ripemd160");
const createHash = require('../create-hash/index.js');
const createHmac = require('../create-hmac/index.js');
function hash160(buffer) {
    const sha256Hash = createHash('sha256')
        //@ts-ignore
        .update(buffer)
        .digest();
    try {
        return createHash('rmd160')
            //@ts-ignore
            .update(sha256Hash)
            .digest();
    }
    catch (err) {
        try {
            return createHash('ripemd160')
                //@ts-ignore
                .update(sha256Hash)
                .digest();
        }
        catch (err2) {
            //@ts-ignore
            return new RipeMd160().update(sha256Hash).digest();
        }
    }
}
exports.hash160 = hash160;
function hmacSHA512(key, data) {
    return createHmac('sha512', key)
        //@ts-ignore
        .update(data)
        .digest();
}
exports.hmacSHA512 = hmacSHA512;
