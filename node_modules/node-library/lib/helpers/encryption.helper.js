"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.encryptPassword = void 0;
const crypt = require('simple-encryptor');
const getKey = (val) => {
    return val + ";[9,Tx.YHt+kTxr,";
};
const encryptPassword = function (password) {
    return crypt(getKey(password)).encrypt(password);
};
exports.encryptPassword = encryptPassword;
const checkPassword = function (encrypted, plain) {
    return crypt(getKey(plain)).decrypt(encrypted) === plain;
};
exports.checkPassword = checkPassword;
