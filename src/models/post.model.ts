import * as mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    body:{
        type: String,
        trim: true,
        required: 'Post Body is required'
    },
    topic:{
        type: String,
        trim: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastModifiedAt: {
        type: Date,
        default: Date.now
    },
    author:{
       type:String,
       required: 'user is required'
    },
    groupId: {
        type:String,
        required: 'group id is required'
    }
});


const Post = mongoose.model('Post',postSchema);

export default Post;