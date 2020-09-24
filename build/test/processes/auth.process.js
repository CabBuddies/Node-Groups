"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.signOutAll = exports.signOut = exports.signIn = exports.getAccessToken = void 0;
const node_library_1 = require("node-library");
const config_helper_1 = require("../helpers/config.helper");
var expect = node_library_1.Test.Chai.expect;
var request = node_library_1.Test.Request;
var common = node_library_1.Test.Common;
const baseUrl = config_helper_1.default.HOST + config_helper_1.default.API_BASE;
function signUp(data) {
    return __awaiter(this, void 0, void 0, function* () {
        data.registrationType = data.registrationType || 'InApp';
        data.responseStatus = data.responseStatus || 201;
        let response = yield request.formattedApiRequest({
            host: baseUrl,
            method: 'post',
            url: baseUrl + config_helper_1.default.PATH.AUTH.SIGN_UP,
            data
        });
        console.log(response);
        expect(response.status).to.equal(data.responseStatus);
        if (response.status === 201) {
            common.nonEmptyString(response.data.accessToken.value);
            common.nonEmptyString(response.data.refreshToken.value);
        }
        return response.data || {};
    });
}
exports.signUp = signUp;
function signIn(data) {
    return __awaiter(this, void 0, void 0, function* () {
        data.responseStatus = data.responseStatus || 201;
        let response = yield request.formattedApiRequest({
            host: baseUrl,
            method: 'post',
            path: config_helper_1.default.PATH.AUTH.SIGN_IN,
            data
        });
        console.log(response);
        expect(response.status).to.equal(data.responseStatus);
        if (response.status === 201) {
            common.nonEmptyString(response.data.accessToken.value);
            common.nonEmptyString(response.data.refreshToken.value);
        }
        else if (response.status === 401) {
            common.nonEmptyString(response.data);
        }
        else if (response.status === 404) {
            common.nonEmptyString(response.data);
        }
        return response.data || {};
    });
}
exports.signIn = signIn;
function signOut(data) {
    return __awaiter(this, void 0, void 0, function* () {
        data.responseStatus = data.responseStatus || 204;
        let response = yield request.formattedApiRequest({
            host: baseUrl,
            method: 'delete',
            path: config_helper_1.default.PATH.AUTH.SIGN_OUT,
            token: {
                type: 'refresh',
                value: data.refreshToken
            }
        });
        console.log(response);
        expect(response.status).to.equal(data.responseStatus);
        return response.data || {};
    });
}
exports.signOut = signOut;
function signOutAll(data) {
    return __awaiter(this, void 0, void 0, function* () {
        data.responseStatus = data.responseStatus || 204;
        let response = yield request.formattedApiRequest({
            host: baseUrl,
            method: 'delete',
            path: config_helper_1.default.PATH.AUTH.SIGN_OUT_ALL,
            token: {
                type: 'refresh',
                value: data.refreshToken
            }
        });
        console.log(response);
        expect(response.status).to.equal(data.responseStatus);
        return response.data || {};
    });
}
exports.signOutAll = signOutAll;
function getAccessToken(data) {
    return __awaiter(this, void 0, void 0, function* () {
        data.responseStatus = data.responseStatus || 201;
        let response = yield request.formattedApiRequest({
            host: baseUrl,
            method: 'get',
            path: config_helper_1.default.PATH.AUTH.GET_ACCESS_TOKEN,
            token: {
                type: 'refresh',
                value: data.refreshToken
            }
        });
        console.log(response);
        expect(response.status).to.equal(data.responseStatus);
        if (response.status === 201) {
            common.isNumber(response.data.accessToken.expiryTime);
            common.nonEmptyString(response.data.accessToken.value);
        }
        return response.data || {};
    });
}
exports.getAccessToken = getAccessToken;
