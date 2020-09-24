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
class AuthService extends node_library_1.Services.BaseService {
    constructor() {
        super(new repositories_1.AuthRepository());
        this.createJwt = (request, auth, buildRefresh) => {
            const accessToken = node_library_1.Helpers.JWT.encodeToken(auth, node_library_1.Helpers.JWT.SECRET_TYPE.access, node_library_1.Helpers.JWT.TIME.s30);
            if (buildRefresh) {
                const refreshToken = node_library_1.Helpers.JWT.encodeToken(auth, node_library_1.Helpers.JWT.SECRET_TYPE.refresh, node_library_1.Helpers.JWT.TIME.m30);
                this.refreshTokenRepository.create({
                    refreshToken,
                    userId: auth.id,
                    ip: request.getIP()
                });
                return { accessToken, refreshToken };
            }
            return { accessToken };
        };
        this.signUp = (request, user) => __awaiter(this, void 0, void 0, function* () {
            console.log(user);
            let { email, password, firstName, lastName, registrationType } = user;
            console.log('querying for users on :', email);
            const users = yield this.repository.getUsersByEmail(email);
            console.log('users', users);
            if (users.resultSize !== 0) {
                throw this.buildError(400, "A User has already registered with the email address.");
            }
            password = node_library_1.Helpers.Encryption.encryptPassword(password);
            let entity = {
                email,
                password,
                account: {
                    type: registrationType
                }
            };
            entity = yield this.create(request, entity);
            console.log(entity);
            node_library_1.Services.PubSub.Organizer.publishEvent({
                request,
                type: pubsub_helper_1.PubSubEventTypes.AUTH.USER_CREATED,
                data: {
                    id: entity._id,
                    email,
                    firstName,
                    lastName
                }
            });
            return this.createJwt(request, {
                id: entity._id,
                email,
                expiryTime: 0
            }, true);
        });
        this.signIn = (request, user) => __awaiter(this, void 0, void 0, function* () {
            let { email, password } = user;
            const users = yield this.repository.getUsersByEmail(email);
            if (users.resultSize === 0) {
                throw this.buildError(404, "A User with this email is not available.");
            }
            if (users.resultSize !== 1) {
                throw this.buildError(500, "Duplicate email error.");
            }
            const entity = users.result[0];
            if (node_library_1.Helpers.Encryption.checkPassword(entity.password, password) == false) {
                throw this.buildError(401, "Incorrect email/password.");
            }
            node_library_1.Services.PubSub.Organizer.publishEvent({
                request,
                type: pubsub_helper_1.PubSubEventTypes.AUTH.USER_SIGNED_IN,
                data: {
                    id: entity._id,
                    email
                }
            });
            return this.createJwt(request, {
                id: entity._id,
                email,
                expiryTime: 0
            }, true);
        });
        this.getAccessToken = (request) => __awaiter(this, void 0, void 0, function* () {
            return this.createJwt(request, {
                id: request.getUserId(),
                email: request.getEmail(),
                expiryTime: 0
            }, false);
        });
        this.signOut = (request) => __awaiter(this, void 0, void 0, function* () {
            yield this.refreshTokenRepository.removeByRefreshToken(request.getTokenValue());
        });
        this.signOutAll = (request) => __awaiter(this, void 0, void 0, function* () {
            yield this.refreshTokenRepository.removeAllByUserId(request.getUserId());
        });
        this.refreshTokenRepository = new repositories_1.RefreshTokenRepository();
    }
}
exports.default = AuthService;
