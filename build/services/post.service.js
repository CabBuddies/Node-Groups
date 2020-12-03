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
const stats_service_1 = require("./stats.service");
const binder_helper_1 = require("../helpers/binder.helper");
class PostService extends stats_service_1.default {
    constructor() {
        super(new repositories_1.PostRepository());
        this.create = (request, data) => __awaiter(this, void 0, void 0, function* () {
            console.log('post.service', request, data);
            const groupIdExists = yield node_library_1.Services.Binder.boundFunction(binder_helper_1.BinderNames.GROUP.CHECK.ID_EXISTS)(request, data.groupId);
            console.log('post.service', 'postIdExists', groupIdExists);
            if (!groupIdExists)
                throw this.buildError(404);
            data.author = request.getUserId();
            console.log('group.service', 'db insert', data);
            data.stats = {};
            data = yield this.repository.create(data);
            node_library_1.Services.PubSub.Organizer.publishMessage({
                request,
                type: pubsub_helper_1.PubSubMessageTypes.POST.CREATED,
                data
            });
            console.log('post.service', 'published message');
            return data;
        });
        this.getAll = (request, query = {}, sort = {}, pageSize = 5, pageNum = 1, attributes = []) => __awaiter(this, void 0, void 0, function* () {
            const exposableAttributes = ['author', 'groupId', 'title', 'topics', 'lastModifiedAt', 'createdAt', 'active', 'stats', 'access.type'];
            if (attributes.length === 0)
                attributes = exposableAttributes;
            else
                attributes = attributes.filter(function (el) {
                    return exposableAttributes.includes(el);
                });
            return this.repository.getAll(query, sort, pageSize, pageNum, attributes);
        });
        this.get = (request, documentId, attributes) => __awaiter(this, void 0, void 0, function* () {
            node_library_1.Services.PubSub.Organizer.publishMessage({
                request,
                type: pubsub_helper_1.PubSubMessageTypes.POST.READ,
                data: {
                    _id: documentId
                }
            });
            return yield this.repository.get(documentId, attributes);
        });
        this.update = (request, documentId, data) => __awaiter(this, void 0, void 0, function* () {
            console.log('post.service', request, data);
            data.lastModifiedAt = new Date();
            //data = Helpers.JSON.normalizeJson(data);
            console.log('post.service', 'db update', data);
            data = yield this.repository.updatePartial(documentId, data);
            node_library_1.Services.PubSub.Organizer.publishMessage({
                request,
                type: pubsub_helper_1.PubSubMessageTypes.POST.UPDATED,
                data
            });
            return data;
        });
        this.delete = (request, documentId) => __awaiter(this, void 0, void 0, function* () {
            let data = {
                active: false
            };
            data = yield this.repository.updatePartial(documentId, data);
            node_library_1.Services.PubSub.Organizer.publishMessage({
                request,
                type: pubsub_helper_1.PubSubMessageTypes.POST.DELETED,
                data
            });
            return data;
        });
        node_library_1.Services.Binder.bindFunction(binder_helper_1.BinderNames.POST.CHECK.ID_EXISTS, this.checkIdExists);
        node_library_1.Services.PubSub.Organizer.addSubscriber(pubsub_helper_1.PubSubMessageTypes.POST.READ, this);
        node_library_1.Services.PubSub.Organizer.addSubscriberAll(pubsub_helper_1.PubSubMessageTypes.OPINION, this);
        node_library_1.Services.PubSub.Organizer.addSubscriber(pubsub_helper_1.PubSubMessageTypes.REPLY.CREATED, this);
        node_library_1.Services.PubSub.Organizer.addSubscriber(pubsub_helper_1.PubSubMessageTypes.REPLY.DELETED, this);
    }
    static getInstance() {
        if (!PostService.instance) {
            PostService.instance = new PostService();
        }
        return PostService.instance;
    }
    processMessage(message) {
        switch (message.type) {
            case pubsub_helper_1.PubSubMessageTypes.POST.READ:
                this.postRead(message.request, message.data);
                break;
            case pubsub_helper_1.PubSubMessageTypes.OPINION.CREATED:
                this.opinionCreated(message.request, message.data, 'postId');
                break;
            case pubsub_helper_1.PubSubMessageTypes.OPINION.DELETED:
                this.opinionDeleted(message.request, message.data, 'postId');
                break;
            case pubsub_helper_1.PubSubMessageTypes.REPLY.CREATED:
                this.replyCreated(message.request, message.data);
                break;
            case pubsub_helper_1.PubSubMessageTypes.REPLY.DELETED:
                this.replyDeleted(message.request, message.data);
                break;
        }
    }
    replyCreated(request, data) {
        this.updateStat(request, data.groupId, "replyCount", true);
    }
    replyDeleted(request, data) {
        this.updateStat(request, data.groupId, "replyCount", false);
    }
    postRead(request, data) {
        this.updateStat(request, data._id, "viewCount", true);
    }
}
exports.default = PostService.getInstance();
