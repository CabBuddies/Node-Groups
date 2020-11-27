import {userDb} from '../db';
import * as mongoose from 'mongoose';

const UserRelation = userDb.model('UserRelation',new mongoose.Schema({},{strict:false}));

export default UserRelation;