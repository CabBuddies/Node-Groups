import * as mongoose from 'mongoose';
import BaseRepository from './base.repository';
declare class AuthorRepository extends BaseRepository {
    constructor(model: mongoose.Model<any, {}>);
    isAuthor: (_id: any, author: any) => Promise<boolean>;
}
export default AuthorRepository;
