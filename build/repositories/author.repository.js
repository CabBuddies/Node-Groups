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
class AuthorRepository extends node_library_1.Repositories.BaseRepository {
    constructor(model) {
        super(model);
        this.isAuthor = (_id, author) => __awaiter(this, void 0, void 0, function* () {
            console.log('repository', 'isAuthor', _id, author);
            try {
                const result = yield this.model.findOne({
                    _id,
                    author
                });
                console.log('repository', 'isAuthor', result);
                return result ? true : false;
            }
            catch (error) {
                console.log(error);
            }
            return false;
        });
    }
}
exports.default = AuthorRepository;
