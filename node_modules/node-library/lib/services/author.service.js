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
const base_service_1 = require("./base.service");
class AuthorService extends base_service_1.default {
    constructor(repository) {
        super(repository);
        this.isAuthor = (request, entityId) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.isAuthor(entityId, request.getUserId());
        });
        this.checkIdExists = (request, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.get(id);
                console.log('AuthorService', 'checkIdExists', result);
                return result;
            }
            catch (error) {
                console.log(error);
            }
            return false;
        });
        this.embedAuthorInformation = (request, arr = [], attributes = ['author'], extractUserProfiles) => __awaiter(this, void 0, void 0, function* () {
            console.log('embedAuthorInformation', arr);
            if (arr.length === 0)
                return arr;
            const authors = {};
            arr.forEach((a) => {
                attributes.forEach((at) => {
                    authors[a[at]] = {};
                });
            });
            const authorInfos = yield extractUserProfiles(Object.keys(authors));
            authorInfos.forEach((authorInfo) => {
                authorInfo = JSON.parse(JSON.stringify(authorInfo));
                authors[authorInfo['userId']] = authorInfo;
            });
            console.log('embedAuthorInformation', authors);
            for (let i = 0; i < arr.length; i++) {
                attributes.forEach((attribute) => {
                    arr[i] = JSON.parse(JSON.stringify(arr[i]));
                    arr[i][attribute] = authors[arr[i][attribute]];
                });
            }
            console.log('embedAuthorInformation', arr);
            return arr;
        });
    }
}
exports.default = AuthorService;
