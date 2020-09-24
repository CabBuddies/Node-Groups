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
const services_1 = require("../services");
const node_library_1 = require("node-library");
class AuthController extends node_library_1.Controllers.BaseController {
    constructor() {
        super(new services_1.AuthService());
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const request = res.locals.request;
            try {
                const creds = yield this.service.signUp(request, body);
                return res.status(201).send(creds);
            }
            catch (error) {
                console.log(error);
                return res.status(error.status).send(error.message);
            }
        });
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const request = res.locals.request;
            try {
                console.log(request, body);
                const creds = yield this.service.signIn(request, body);
                console.log(creds);
                return res.status(201).send(creds);
            }
            catch (error) {
                console.log('blah');
                console.log('signIn auth controller', error);
                return res.status(error.status).send(error.message);
            }
        });
        this.getAccessToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const request = res.locals.request;
            res.status(201).send(yield this.service.getAccessToken(request));
        });
        this.signOut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const request = res.locals.request;
            yield this.service.signOut(request);
            res.sendStatus(204);
        });
        this.signOutAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const request = res.locals.request;
            yield this.service.signOutAll(request);
            res.sendStatus(204);
        });
    }
}
exports.default = AuthController;
