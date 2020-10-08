import {Config} from 'node-library';

var mongoose = require('mongoose');

var primaryDb = mongoose.createConnection(Config.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

var userDb = mongoose.createConnection(Config.MONGO_URI_UM,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

export {
    primaryDb,
    userDb
};

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