import {primaryDb} from '../db';
import * as mongoose from 'mongoose';

const opinionSchema = new mongoose.Schema({
    body:{
        type:String
    },
    groupId:{
        type:String
    },
    postId:{
        type:String
    },
    author:{
        type:String,
        required: 'author is required'
    },
    opinionType:{
        type:String,
        enum:['follow','upvote','downvote','spamreport'],
        default:'upvote'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    customAttributes:mongoose.Schema.Types.Mixed
});

const Opinion = primaryDb.model('Opinion',opinionSchema);

export default Opinion;