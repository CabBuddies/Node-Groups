import {userDb} from '../db';
import * as mongoose from 'mongoose';

const User = userDb.model('User',new mongoose.Schema({},{strict:false}));

export default User;