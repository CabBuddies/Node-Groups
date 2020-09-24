import * as express from 'express';

import {Controllers} from 'node-library';

import {PostService} from '../services';
import {Helpers} from 'node-library';

class PostController extends Controllers.BaseController{
    constructor(){
        super(new PostService())
    }

}
export default PostController;