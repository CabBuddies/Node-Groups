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
class BaseService {
    constructor(repository = null) {
        this.documentExists = (request, documentId) => __awaiter(this, void 0, void 0, function* () {
            if (!documentId) {
                throw this.buildError(400, "documentId is required.");
            }
            return yield this.repository.documentExists(documentId);
        });
        this.get = (request, documentId, attributes = []) => __awaiter(this, void 0, void 0, function* () {
            if (!documentId) {
                throw this.buildError(400, "documentId is required.");
            }
            const currentdocument = yield this.repository.get(documentId, attributes);
            if (!currentdocument) {
                throw this.buildError(404, "Requested document not found.");
            }
            return currentdocument;
        });
        this.getAll = (request, query = {}, sort = {}, pageSize = 5, pageNum = 1, attributes = []) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getAll(query, sort, pageSize, pageNum, attributes);
        });
        this.create = (request, document) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.create(document);
        });
        this.update = (request, documentId, document) => __awaiter(this, void 0, void 0, function* () {
            if (!documentId) {
                throw this.buildError(400, "documentId is required.");
            }
            return yield this.repository.update(documentId, document);
        });
        this.updatePartial = (request, documentId, partial) => __awaiter(this, void 0, void 0, function* () {
            if (!documentId) {
                throw this.buildError(400, "documentId is required.");
            }
            return yield this.repository.updatePartial(documentId, partial);
        });
        this.delete = (request, documentId) => __awaiter(this, void 0, void 0, function* () {
            if (!documentId) {
                throw this.buildError(400, "documentId is required.");
            }
            return yield this.repository.delete(documentId);
        });
        this.deleteAll = (request) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.deleteAll();
        });
        this.repository = repository;
    }
    processMessage(message) {
        console.log(message);
    }
    buildError(errorCode = 500, errorMessage = "Unknown Server Error.") {
        const error = {};
        error['status'] = errorCode;
        error['message'] = errorMessage;
        return error;
    }
}
exports.default = BaseService;
