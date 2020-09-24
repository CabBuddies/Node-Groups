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
const node_library_1 = require("node-library");
const models_1 = require("../models");
class RefreshTokenRepository extends node_library_1.Repositories.BaseRepository {
    constructor() {
        super(models_1.RefreshToken);
        //whitelisted refresh token count
        this.getActiveRefreshTokenCount = (refreshToken) => __awaiter(this, void 0, void 0, function* () {
            let temp = {
                refreshToken: {
                    value: refreshToken,
                    expiryTime: {
                        $gt: Date.now()
                    }
                }
            };
            temp = {
                $and: [
                    { "refreshToken.value": refreshToken },
                    {
                        "refreshToken.expiryTime": {
                            $gt: Date.now()
                        }
                    }
                ]
            };
            console.log('getActiveRefreshTokenCount', temp);
            temp = yield this.model.count(temp);
            console.log('getActiveRefreshTokenCount', temp);
            return temp;
        });
        //sign_out
        this.removeByRefreshToken = (refreshToken) => __awaiter(this, void 0, void 0, function* () {
            return yield this.model.deleteOne({ "refreshToken.value": refreshToken });
        });
        //sign_out_all
        this.removeAllByUserId = (userId) => __awaiter(this, void 0, void 0, function* () {
            return yield this.model.deleteMany({ userId });
        });
        this.update = (entity) => __awaiter(this, void 0, void 0, function* () {
            console.log('blocked method');
        });
    }
}
exports.default = RefreshTokenRepository;
