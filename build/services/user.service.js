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
class UserService extends node_library_1.Services.BaseService {
    constructor() {
        super(new repositories_1.UserRepository());
        this.getUserByEmail = (request, email) => __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getUserByEmail(email);
        });
        node_library_1.Services.PubSub.Organizer.addSubscriber(pubsub_helper_1.PubSubEventTypes.AUTH.USER_CREATED, this);
    }
    eventListened(event) {
        console.log('UserService', event);
        switch (event.type) {
            case pubsub_helper_1.PubSubEventTypes.AUTH.USER_CREATED:
                this.userCreated(event);
                break;
            default:
                break;
        }
    }
    userCreated(event) {
        const { email, firstName, lastName } = event.data;
        this.create(event.request, {
            email,
            firstName,
            lastName
        });
    }
}
exports.default = UserService;
