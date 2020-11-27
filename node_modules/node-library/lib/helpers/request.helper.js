"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Request {
    constructor() {
        this.id = Date.now().toString();
        this.user = {
            isAuthenticated: false,
            isConfirmed: false,
            id: '',
            email: '',
        };
        this.header = {
            ip: '',
            token: {
                type: '',
                value: '',
                expiryTime: 0,
                isExpired: true,
                secondsToExpiry: 0
            }
        };
        this.raw = {
            body: {},
            query: {},
            params: {}
        };
        this.hasToken = false;
    }
    getId() {
        return this.id;
    }
    setIP(ip) {
        if (ip) {
            this.header.ip = ip;
        }
        return this.header.ip;
    }
    getIP() {
        return this.header.ip;
    }
    setEmail(email) {
        if (email) {
            this.user.isAuthenticated = true;
            this.user.email = email;
        }
        return this.user.email;
    }
    getEmail() {
        return this.user.email;
    }
    setUserId(id) {
        if (id) {
            this.user.isAuthenticated = true;
            this.user.id = id;
        }
        return this.user.id;
    }
    getUserId() {
        return this.user.id;
    }
    setToken(tokenP) {
        let token = {
            type: '',
            value: '',
            expiryTime: 0,
            isExpired: true,
            secondsToExpiry: 0
        };
        if (tokenP) {
            this.hasToken = true;
            token.type = tokenP.type.toLowerCase();
            token.value = tokenP.value;
            token.expiryTime = tokenP.expiryTime;
            const seconds = (tokenP.expiryTime - Date.now()) / 1000;
            token.isExpired = seconds <= 0;
            token.secondsToExpiry = seconds;
            this.header.token = token;
        }
        return this.header.token;
    }
    getToken() {
        return this.header.token;
    }
    getTokenValue() {
        return this.header.token.value;
    }
    getTokenType() {
        return this.header.token.type;
    }
    isTokenExpired() {
        return this.header.token.isExpired;
    }
    isUserAuthenticated() {
        return this.user.isAuthenticated;
    }
    isUserConfirmed() {
        return this.user.isConfirmed;
    }
    setConfirmed(isConfirmed) {
        this.user.isConfirmed = isConfirmed;
        return this.user.isConfirmed;
    }
    setRaw(raw) {
        this.raw = raw;
        return this.raw;
    }
    getRaw() {
        return this.raw;
    }
}
exports.default = Request;
