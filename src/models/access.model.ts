import {primaryDb} from '../db';
import * as mongoose from 'mongoose';
import {Schemas} from 'node-library';

const accessSchema = new mongoose.Schema({
    author:{
        type:String,
        required:'author is required'
    },
    groupId:{
        type:String,
        required:'groupId is required'
    },
    userId:{
        type:String,
        required:'userId is required'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastModifiedAt:{
        type: Date,
        default: Date.now
    },
    role:{
        type:String,
        enum:["member","contributor","manager"],
        /*
            member - basic view access to group, can post on group if group's preferences allow it.
            contributor - basic view and post access to group.
            manager - 
        */
        default:"member"
    },
    status:{
        type:String,
        enum:["accepted","requested","requestblocked","invited","inviteblocked"],
        /*
            A is the author of Group

            accepted - A accepts B's membership request, or B accepts A's invite.
            requested - B requested for membership to A's group.
            invited - A can send an invite to B , if B is a follower of A.
        */
        default:"requested"
    },
    customAttributes:mongoose.Schema.Types.Mixed
});

const Access = primaryDb.model('Access',accessSchema);

export default Access;