import * as mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
    author:{
        type:String,
        required: 'author is required'
    },
    body:{
        type: String,
        trim: true,
        required: 'Reply body is required'
    },
    postId:{
        type:String,
        required: 'postId is required'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastModifiedAt: {
        type: Date,
        default: Date.now
    }
});


const Reply = mongoose.model('Reply',replySchema);

export default Reply;