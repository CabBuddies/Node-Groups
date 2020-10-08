import {primaryDb} from '../db';
import * as mongoose from 'mongoose';
import { statsSchema } from '../schemas';

const postSchema = new mongoose.Schema({
    groupId: {
        type:String,
        required: 'groupId is required'
    },
    title:{
        type: String,
        trim: true,
        required: 'Post Title is required'
    },
    body:{
        type: String,
        trim: true,
        required: 'Post Body is required'
    },
    topics:[{
        type: String,
        trim: true
    }],
    author:{
       type:String,
       required: 'author is required'
    },
    active:{
        type:Boolean,
        default : true
    },
    stats:statsSchema,
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


const Post = primaryDb.model('Post',postSchema);

export default Post;