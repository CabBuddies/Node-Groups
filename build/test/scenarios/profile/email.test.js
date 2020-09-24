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
const profile = require("../../processes/profile.process");
describe('Profile', () => {
    describe('Email', () => {
        it('anonymous', function () {
            return __awaiter(this, void 0, void 0, function* () {
                let response = yield profile.email({
                    email: 'nihal+test1@cabbuddies.com',
                    responseStatus: 200
                });
                console.debug(response);
            });
        });
    });
});
