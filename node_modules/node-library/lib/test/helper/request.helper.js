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
exports.formattedApiRequest = exports.apiRequest = void 0;
const axios = require('axios');
function apiRequest(packet) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(packet);
            return new Promise(function (resolve, reject) {
                axios(packet)
                    .then((response) => {
                    const { status, data } = response;
                    resolve({ status, data });
                })
                    .catch((error) => {
                    const { status, data } = error.response;
                    resolve({ status, data });
                });
            });
        }
        catch (error) {
            return {
                status: error.response.status || 500,
                data: {
                    raw: JSON.parse(JSON.stringify(error)),
                    message: error.response.message || 'unknown server issue'
                }
            };
        }
    });
}
exports.apiRequest = apiRequest;
function formattedApiRequest(packet) {
    return __awaiter(this, void 0, void 0, function* () {
        packet.path = packet.path || '';
        packet.headers = packet.headers || {};
        packet.url = packet.host + packet.path;
        packet.method = packet.method || 'get';
        if (packet.token) {
            packet.headers["authorization"] = packet.token.type + " " + packet.token.value;
        }
        if (packet.params) {
            for (const k of Object.keys(packet.params)) {
                packet.url = packet.url.replace(':' + k, packet.params[k] + '');
            }
            delete packet.params;
        }
        if (packet.query) {
            const q = [];
            for (const k of Object.keys(packet.query)) {
                q.push(k + '=' + packet.query[k]);
            }
            packet.url += '?' + q.join('&');
            delete packet.query;
        }
        return yield apiRequest(packet);
    });
}
exports.formattedApiRequest = formattedApiRequest;
