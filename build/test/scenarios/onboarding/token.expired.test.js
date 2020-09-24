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
const auth = require("../../processes/auth.process");
const node_library_1 = require("node-library");
var common = node_library_1.Test.Common;
describe('Auth', function () {
    describe('Request Access Token', function () {
        it('with good refreshToken', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield auth.signIn({
                    email: "nihal+test1@cabbuddies.com",
                    password: "strong",
                    responseStatus: 201
                });
                yield common.wait(2000);
                console.debug(data);
                let response = yield auth.getAccessToken({
                    refreshToken: data.refreshToken.value,
                    responseStatus: 201
                });
                console.debug(response);
                const accessToken = common.jsonStructure(response, ['accessToken', 'value']);
            });
        });
    });
});
