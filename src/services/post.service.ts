import {PostRepository} from '../repositories';
import {Services,Helpers} from 'node-library';

class PostService extends Services.BaseService {
    constructor(){
        super(new PostRepository());
    }

    
}

export default PostService;