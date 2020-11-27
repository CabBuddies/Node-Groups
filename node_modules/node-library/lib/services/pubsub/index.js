"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organizer = void 0;
class Main {
    constructor() {
        this.subscription = {};
        this.addSubscriberAll = (messageTypes, subscriber) => {
            const topics = [];
            for (const k of Object.keys(messageTypes)) {
                if (typeof messageTypes[k] === typeof 's') {
                    topics.push(messageTypes[k]);
                }
                else {
                    this.addSubscriberAll(messageTypes[k], subscriber);
                }
            }
            for (const t of topics) {
                this.addSubscriber(t, subscriber);
            }
        };
        this.addSubscriber = (messageType, subscriber) => {
            if (messageType in this.subscription === false) {
                this.subscription[messageType] = [];
            }
            this.subscription[messageType].push(subscriber);
        };
        this.removeSubscriber = (messageType, subscriber) => {
            this.subscription[messageType] = this.subscription[messageType].filter(function (value, index, arr) {
                return value != subscriber;
            });
        };
        this.publishMessage = (message) => {
            console.log('PubSub', message);
            var sub = this.subscription;
            new Promise(function (resolve, reject) {
                try {
                    if (sub[message.type]) {
                        for (const subscriber of sub[message.type]) {
                            try {
                                subscriber.processMessage(message);
                            }
                            catch (error) {
                                console.log(error);
                            }
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                }
            });
        };
    }
}
const Organizer = new Main();
exports.Organizer = Organizer;
