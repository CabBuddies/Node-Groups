import {Repositories} from 'node-library';
import {Post} from '../models';
import StatsRepository from './stats.repository';

class PostRepository extends StatsRepository {
    constructor(){
        super(Post);
    }
    
}

export default PostRepository;