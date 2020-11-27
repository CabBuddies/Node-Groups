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
class BaseController {
    constructor(service = null) {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const request = res.locals.request;
                const body = req.body;
                const createdDocument = yield this.service.create(request, body);
                return res.send(createdDocument);
            }
            catch (error) {
                console.log(error);
                if (error.status && error.message) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send('unknown server issue');
            }
        });
        this.get = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const request = res.locals.request;
                const documentId = req.params.id;
                const attributes = req.body.attributes;
                const document = yield this.service.get(request, documentId, attributes);
                return res.send(document);
            }
            catch (error) {
                console.log(error);
                if (error.status && error.message) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send('unknown server issue');
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const request = res.locals.request;
                const pageSize = parseInt(req.query.pageSize + '') || 5;
                const pageNum = parseInt(req.query.pageNum + '') || 1;
                const query = req.body.query;
                const sort = req.body.sort;
                const attributes = req.body.attributes;
                const result = yield this.service.getAll(request, query, sort, pageSize, pageNum, attributes);
                return res.send(result);
            }
            catch (error) {
                console.log(error);
                if (error.status && error.message) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send('unknown server issue');
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const request = res.locals.request;
                const documentId = req.params.id;
                const body = req.body;
                const updatedDocument = yield this.service.update(request, documentId, body);
                return res.send(updatedDocument);
            }
            catch (error) {
                console.log(error);
                if (error.status && error.message) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send('unknown server issue');
            }
        });
        this.updatePartial = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const request = res.locals.request;
                const documentId = req.params.id;
                const body = req.body;
                const updatedDocument = yield this.service.updatePartial(request, documentId, body);
                return res.send(updatedDocument);
            }
            catch (error) {
                console.log(error);
                if (error.status && error.message) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send('unknown server issue');
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const request = res.locals.request;
                const documentId = req.params.id;
                const deleteddocument = yield this.service.delete(request, documentId);
                return res.send(deleteddocument);
            }
            catch (error) {
                console.log(error);
                if (error.status && error.message) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send('unknown server issue');
            }
        });
        this.deleteAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const request = res.locals.request;
                const deletedDocuments = yield this.service.deleteAll(request);
                return res.send(deletedDocuments);
            }
            catch (error) {
                console.log(error);
                if (error.status && error.message) {
                    return res.status(error.status).send(error.message);
                }
                return res.status(500).send('unknown server issue');
            }
        });
        this.service = service;
    }
}
exports.default = BaseController;
