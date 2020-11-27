"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.encodeToken = exports.SECRET_TYPE = exports.TIME = void 0;
const config = require("../config");
const jwt = require("jsonwebtoken");
const TIME = {
    s30: 30,
    m30: 30 * 60,
    d30: 30 * 24 * 60 * 60
};
exports.TIME = TIME;
const SECRET_TYPE = {
    access: 'access',
    refresh: 'refresh'
};
exports.SECRET_TYPE = SECRET_TYPE;
const getSecret = (type) => {
    switch (type.toLowerCase()) {
        case SECRET_TYPE.access:
            return config.ACCESS_TOKEN_SECRET;
        case SECRET_TYPE.refresh:
            return config.REFRESH_TOKEN_SECRET;
        default:
            return 'none';
    }
};
const encodeToken = function (decoded, type, seconds) {
    decoded.expiryTime = Date.now() + (seconds * 1000);
    return {
        value: jwt.sign(decoded, getSecret(type) + '', { 'expiresIn': seconds + 's' }),
        expiryTime: decoded.expiryTime
    };
};
exports.encodeToken = encodeToken;
const decodeToken = function (token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token.value, getSecret(token.type) + '', function (err, decoded) {
            if (err)
                resolve(undefined);
            else
                resolve(decoded);
        });
    });
};
exports.decodeToken = decodeToken;
