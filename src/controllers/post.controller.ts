//const BaseController = require('./base.controller')
import * as express from 'express';
import {PostService} from '../services';
import {Helpers, Controllers} from 'node-library';

class PostController extends Controllers.BaseController{
    
    constructor(){
        super(PostService);
    }

}
export default PostController;