import {GroupService} from '../services';
import {Helpers, Controllers} from 'node-library';

class GroupController extends Controllers.BaseController{
    
    constructor(){
        super(GroupService);
    }

}
export default GroupController;