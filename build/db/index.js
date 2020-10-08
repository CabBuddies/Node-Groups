"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDb = exports.primaryDb = void 0;
const node_library_1 = require("node-library");
var mongoose = require('mongoose');
var primaryDb = mongoose.createConnection(node_library_1.Config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
exports.primaryDb = primaryDb;
var userDb = mongoose.createConnection(node_library_1.Config.MONGO_URI_UM, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
exports.userDb = userDb;
/*
var connection = {};

async function getConnection(uri : string){
    try {
        if(!connection[uri])
            connection = await mongoose.connect(uri,{
                useNewUrlParser:true,
                useUnifiedTopology: true
            });
    } catch (error) {
        console.log(error);
    }
    return connection[uri];
}

async function getPrimaryDB(){
    return await getConnection(Config.MONGO_URI);
}
async function getUserDB(){
    return await getConnection(Config.MONGO_URI_UM);
}
*/ 
