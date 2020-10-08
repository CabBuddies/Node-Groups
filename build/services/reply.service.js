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
const repositories_1 = require("../repositories");
const node_library_1 = require("node-library");
const pubsub_helper_1 = require("../helpers/pubsub.helper");
const author_service_1 = require("./author.service");
const binder_helper_1 = require("../helpers/binder.helper");
class ReplyService extends author_service_1.default {
    constructor() {
        super(new repositories_1.ReplyRepository());
        this.create = (request, data) => __awaiter(this, void 0, void 0, function* () {
            console.log('reply.service', request, data);
            const postIdExists = yield node_library_1.Services.Binder.boundFunction(binder_helper_1.BinderNames.POST.CHECK.ID_EXISTS)(request, data.postId);
            console.log('reply.service', 'create', 'postIdExists', postIdExists);
            if (!postIdExists)
                throw this.buildError(404, 'postId not available');
            data.author = request.getUserId();
            data = node_library_1.Helpers.JSON.normalizeJson(data);
            console.log('reply.service', 'db insert', data);
            data = yield this.repository.create(data);
            node_library_1.Services.PubSub.Organizer.publishMessage({
                request,
                type: pubsub_helper_1.PubSubMessageTypes.REPLY.CREATED,
                data
            });
            console.log('reply.service', 'published message');
            return data;
        });
        this.get = (request, documentId, attributes) => __awaiter(this, void 0, void 0, function* () {
            node_library_1.Services.PubSub.Organizer.publishMessage({
                request,
                type: pubsub_helper_1.PubSubMessageTypes.REPLY.READ,
                data: {
                    _id: documentId
                }
            });
            return yield this.repository.get(documentId, attributes);
        });
        this.update = (request, documentId, data) => __awaiter(this, void 0, void 0, function* () {
            console.log('reply.service', request, data);
            data.lastModifiedAt = new Date();
            data = node_library_1.Helpers.JSON.normalizeJson(data);
            console.log('reply.service', 'db update', data);
            data = yield this.repository.updatePartial(documentId, data);
            node_library_1.Services.PubSub.Organizer.publishMessage({
                request,
                type: pubsub_helper_1.PubSubMessageTypes.REPLY.UPDATED,
                data
            });
            return data;
        });
        this.delete = (request, documentId) => __awaiter(this, void 0, void 0, function* () {
            let data = yield this.repository.delete(documentId);
            node_library_1.Services.PubSub.Organizer.publishMessage({
                request,
                type: pubsub_helper_1.PubSubMessageTypes.REPLY.DELETED,
                data
            });
            return data;
        });
    }
    static getInstance() {
        if (!ReplyService.instance) {
            ReplyService.instance = new ReplyService();
        }
        return ReplyService.instance;
    }
}
exports.default = ReplyService.getInstance();
