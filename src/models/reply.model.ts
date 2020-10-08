import {primaryDb} from '../db';
import * as mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
    postId:{
        type:String,
        required: 'postId is required'
    },
    body:{
        type: String,
        trim: true,
        required: 'Reply body is required'
    },
    author:{
        type:String,
        required: 'author is required'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastModifiedAt: {
        type: Date,
        default: Date.now
    },
    customAttributes:mongoose.Schema.Types.Mixed
});


const Reply = primaryDb.model('Reply',replySchema);

export default Reply;