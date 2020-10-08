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
function isAuthor(service) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const request = res.locals.request;
        const isAuthor = yield service.isAuthor(request, req.params.id);
        console.log('isAuthor', isAuthor);
        if (isAuthor) {
            next();
        }
        else {
            res.status(403).send('Only Author is allowed to perform this operation');
        }
    });
}
exports.default = isAuthor;
