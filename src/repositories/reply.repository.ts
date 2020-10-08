import {Repositories} from 'node-library';
import {Reply} from '../models';
import AuthorRepository from './author.repository';

class ReplyRepository extends AuthorRepository {
    constructor(){
        super(Reply);
    }
    
}

export default ReplyRepository;