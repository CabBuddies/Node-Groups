"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = exports.isNumber = exports.nonEmptyString = exports.jsonStructure = void 0;
const chai_helper_1 = require("./chai.helper");
function jsonStructure(json, keys) {
    for (const k of keys) {
        chai_helper_1.expect(k in json).to.be.true;
        json = json[k];
    }
    chai_helper_1.expect(json).to.not.be.undefined;
    chai_helper_1.expect(json).to.not.be.null;
    return json;
}
exports.jsonStructure = jsonStructure;
function nonEmptyString(value) {
    chai_helper_1.expect(value).to.be.a('string');
    chai_helper_1.expect(value).to.not.equal("");
    return value;
}
exports.nonEmptyString = nonEmptyString;
function isNumber(value) {
    chai_helper_1.expect(value).to.be.a('number');
    return value;
}
exports.isNumber = isNumber;
function wait(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(ms);
        }, ms);
    });
}
exports.wait = wait;
