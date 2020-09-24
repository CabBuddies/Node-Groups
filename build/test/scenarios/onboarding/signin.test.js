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
describe('Auth', () => {
    describe('Sign In', () => {
        it('with good credentials', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield auth.signIn({
                    email: "nihal+test1@cabbuddies.com",
                    password: "strong",
                    responseStatus: 201
                });
                console.debug(data);
            });
        });
        it('with bad password', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield auth.signIn({
                    email: "nihal+test1@cabbuddies.com",
                    password: "weak",
                    responseStatus: 401
                });
                console.debug(data);
            });
        });
        it('with bad email', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield auth.signIn({
                    email: "test1000@cabbuddies.com",
                    password: "strong",
                    responseStatus: 404
                });
                console.debug(data);
            });
        });
        it('with bad(empty) password', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield auth.signIn({
                    email: "nihal+test1@cabbuddies.com",
                    password: "",
                    responseStatus: 401
                });
                console.debug(data);
            });
        });
    });
});
