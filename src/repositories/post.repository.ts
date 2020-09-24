import {Repositories} from 'node-library';
import {Group,Post} from '../models';

class PostRepository extends Repositories.BaseRepository {
    constructor(){
        super(Post);
    }
    
}

export default PostRepository;