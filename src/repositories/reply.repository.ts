import {Repositories} from 'node-library';
import {Reply} from '../models';

class ReplyRepository extends Repositories.AuthorRepository {
    constructor(){
        super(Reply);
    }
    
}

export default ReplyRepository;