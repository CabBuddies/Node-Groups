import * as mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: 'Group Name is required'
    },
    description:{
        type: String,
        trim: true
    },
    logoPicture:{
        type: String,
        trim: true,
        default:''
    }, 
    users:{
        type: Array,
        required: 'users are required'
    },
    createdAt: {
        type: Date,
        default : Date.now
    },
    lastModifiedAt: {
        type: Date,
        default : Date.now
    },
    access:{
        type:{
            type:String,
            enum:['public','followers','private'],
            default:'public'
        },
        users:[
            String
        ]
    }
    
});




const Group = mongoose.model('Group',groupSchema);

export default Group;