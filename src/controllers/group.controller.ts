import * as express from 'express';

import {Controllers} from 'node-library';

import {GroupService} from '../services';
import {Helpers} from 'node-library';

class GroupController extends Controllers.BaseController{
    constructor(){
        super(new GroupService())
    }

}
export default GroupController;