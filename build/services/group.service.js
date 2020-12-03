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
class GroupService extends stats_service_1.default {
    constructor() {
        super(new repositories_1.GroupRepository());
        this.create = (request, data) => __awaiter(this, void 0, void 0, function* () {
            console.log('group.service', request, data);
            data.author = request.getUserId();
            data.stats = {};
            data.topics = [];
            data.access = {
                users: []
            };
            console.log('Group.service', 'db insert', data);
            data = yield this.repository.create(data);
            node_library_1.Services.PubSub.Organizer.publishMessage({
                request,
                type: pubsub_helper_1.PubSubMessageTypes.GROUP.CREATED,
                data
            });
            console.log('group.service', 'published message');
            return (yield this.embedAuthorInformation(request, [data]))[0];
        });
        this.getAll = (request, query = {}, sort = {}, pageSize = 5, pageNum = 1, attributes = []) => __awaiter(this, void 0, void 0, function* () {
            const exposableAttributes = ['author', 'title', 'displayPicture', 'createdAt', 'lastModifiedAt', 'stats', 'access.type', 'active'];
            if (attributes.length === 0)
                attributes = exposableAttributes;
            else
                attributes = attributes.filter(function (el) {
                    return exposableAttributes.includes(el);
                });
            const data = yield this.repository.getAll(query, sort, pageSize, pageNum, attributes);
            data.result = yield this.embedAuthorInformation(request, data.result);
            return data;
        });
        this.get = (request, documentId, attributes) => __awaiter(this, void 0, void 0, function* () {
            node_library_1.Services.PubSub.Organizer.publishMessage({
                request,
                type: pubsub_helper_1.PubSubMessageTypes.GROUP.READ,
                data: {
                    _id: documentId
                }
            });
            return (yield this.embedAuthorInformation(request, [yield this.repository.get(documentId, attributes)]))[0];
        });
        this.update = (request, documentId, data) => __awaiter(this, void 0, void 0, function* () {
            console.log('group.service', request, data);
            //data = Helpers.JSON.normalizeJson(data);
            data.lastModifiedAt = new Date();
            console.log('Group.service', 'db update', data);
            data = yield this.repository.updatePartial(documentId, data);
            node_library_1.Services.PubSub.Organizer.publishMessage({
                request,
                type: pubsub_helper_1.PubSubMessageTypes.GROUP.UPDATED,
                data
            });
            return (yield this.embedAuthorInformation(request, [data]))[0];
        });
        this.delete = (request, documentId) => __awaiter(this, void 0, void 0, function* () {
            let data = {
                active: false
            };
            data = yield this.repository.updatePartial(documentId, data);
            node_library_1.Services.PubSub.Organizer.publishMessage({
                request,
                type: pubsub_helper_1.PubSubMessageTypes.GROUP.DELETED,
                data
            });
            return (yield this.embedAuthorInformation(request, [data]))[0];
        });
        this.deepEqual = (x, y) => {
            if (x === y) {
                return true;
            }
            else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
                if (Object.keys(x).length != Object.keys(y).length)
                    return false;
                for (var prop in x) {
                    if (y.hasOwnProperty(prop)) {
                        if (!this.deepEqual(x[prop], y[prop]))
                            return false;
                    }
                    else
                        return false;
                }
                return true;
            }
            else
                return false;
        };
        node_library_1.Services.Binder.bindFunction(binder_helper_1.BinderNames.GROUP.CHECK.ID_EXISTS, this.checkIdExists);
        node_library_1.Services.PubSub.Organizer.addSubscriber(pubsub_helper_1.PubSubMessageTypes.GROUP.READ, this);
        node_library_1.Services.PubSub.Organizer.addSubscriberAll(pubsub_helper_1.PubSubMessageTypes.OPINION, this);
        node_library_1.Services.PubSub.Organizer.addSubscriber(pubsub_helper_1.PubSubMessageTypes.POST.CREATED, this);
        node_library_1.Services.PubSub.Organizer.addSubscriber(pubsub_helper_1.PubSubMessageTypes.POST.DELETED, this);
    }
    static getInstance() {
        if (!GroupService.instance) {
            GroupService.instance = new GroupService();
        }
        return GroupService.instance;
    }
    processMessage(message) {
        switch (message.type) {
            case pubsub_helper_1.PubSubMessageTypes.GROUP.READ:
                this.groupRead(message.request, message.data);
                break;
            case pubsub_helper_1.PubSubMessageTypes.OPINION.CREATED:
                this.opinionCreated(message.request, message.data, 'groupId');
                break;
            case pubsub_helper_1.PubSubMessageTypes.OPINION.DELETED:
                this.opinionDeleted(message.request, message.data, 'groupId');
                break;
            case pubsub_helper_1.PubSubMessageTypes.POST.CREATED:
                this.postCreated(message.request, message.data);
                break;
            case pubsub_helper_1.PubSubMessageTypes.POST.DELETED:
                this.postDeleted(message.request, message.data);
                break;
        }
    }
    postCreated(request, data) {
        this.updateStat(request, data.groupId, "postCount", true);
    }
    postDeleted(request, data) {
        this.updateStat(request, data.groupId, "postCount", false);
    }
    groupRead(request, data) {
        this.updateStat(request, data._id, "viewCount", true);
    }
}
exports.default = GroupService.getInstance();
