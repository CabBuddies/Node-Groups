import {primaryDb} from '../db';
import * as mongoose from 'mongoose';
import {statsSchema} from '../schemas';
const groupSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: 'Group Title is required'
    },
    description:{
        type: String,
        trim: true
    }, 
    author:{
        type: String,
        required: 'author is required'
    },
    displayPicture:{
        type: String,
        trim: true,
        default:''
    },
    createdAt: {
        type: Date,
        default : Date.now
    },
    lastModifiedAt: {
        type: Date,
        default : Date.now
    },
    active:{
        type:Boolean,
        default : true
    },
    stats:statsSchema,
    topics:[{
        topic:{
            type: String,
            trim: true
        },
        count:{
            type: Number,
            default: 0
        }
    }],
    access:{
        type:{
            type:String,
            enum:['public','followers','private'],
            default:'public'
        },
        users:[
            String
        ]
    },
    customAttributes:mongoose.Schema.Types.Mixed
});

const Group = primaryDb.model('Group',groupSchema);

export default Group;