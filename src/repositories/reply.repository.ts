import {Repositories} from 'node-library';
import {Post,Reply} from '../models';

class ReplyRepository extends Repositories.BaseRepository {
    constructor(){
        super(Reply);
    }
    
}

export default ReplyRepository;