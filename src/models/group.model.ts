import {primaryDb} from '../db';
import * as mongoose from 'mongoose';
import {statsSchema} from '../schemas';

const timeSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    isFlexible: {
        type:Boolean,
        default: false
    },
    flexibility:{
        early:{
            type: Date,
            default: Date.now
        },
        late:{
            type: Date,
            default: Date.now
        }
    }
});

const placeSchema = new mongoose.Schema({
    gps:{
        lat:{
            type:Number,
            default:0.0
        },
        lng:{
            type:Number,
            default:0.0
        }
    },
    address:{
        raw:{
            type:String,
            default:""
        },
        addressLine1:{
            type:String,
            default:""
        },
        addressLine2:{
            type:String,
            default:""
        },
        city:{
            type:String,
            default:""
        },
        state:{
            type:String,
            default:""
        },
        country:{
            type:String,
            default:""
        },
        zip:{
            type:String,
            default:""
        }
    },
    isFlexible: {
        type:Boolean,
        default: false
    },
    flexibility:{
        miles:{
            type:Number,
            default:0
        }
    }
});

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
    plan:{
        origin:{
            time:timeSchema,
            place:placeSchema
        },
        destination:{
            time:timeSchema,
            place:placeSchema
        }
    },
    access:{
        view:{
            type:String,
            enum:['public','member'],
            default:'public'
        },
        post:{
            type:String,
            enum:['member','contributor'],
            default:'member'
        }
    },
    preferences:{
        automaticMembership:{
            type: Boolean,
            default: true
        }
    },
    customAttributes:mongoose.Schema.Types.Mixed
});

const Group = primaryDb.model('Group',groupSchema);

export default Group;