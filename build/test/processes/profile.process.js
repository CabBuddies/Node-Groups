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
exports.me = exports.email = void 0;
const node_library_1 = require("node-library");
const config_helper_1 = require("../helpers/config.helper");
var expect = node_library_1.Test.Chai.expect;
var request = node_library_1.Test.Request;
var common = node_library_1.Test.Common;
const baseUrl = config_helper_1.default.HOST + config_helper_1.default.API_BASE;
function me(data) {
    return __awaiter(this, void 0, void 0, function* () {
        data.responseStatus = data.responseStatus || 200;
        let response = yield request.formattedApiRequest({
            host: baseUrl,
            method: 'get',
            path: config_helper_1.default.PATH.PROFILE.ME,
            token: {
                type: 'access',
                value: data.accessToken
            }
        });
        console.log(response);
        expect(response.status).to.equal(data.responseStatus);
        return response.data || {};
    });
}
exports.me = me;
function email(data) {
    return __awaiter(this, void 0, void 0, function* () {
        data.responseStatus = data.responseStatus || 200;
        const req = {
            host: baseUrl,
            method: 'get',
            path: config_helper_1.default.PATH.PROFILE.EMAIL,
            params: {
                email: data.email
            }
        };
        if (data.accessToken) {
            req.token = {
                type: 'access',
                value: data.accessToken
            };
        }
        let response = yield request.formattedApiRequest(req);
        console.log(response);
        expect(response.status).to.equal(data.responseStatus);
        return response.data || {};
    });
}
exports.email = email;
