import {ReplyService} from '../services';
import {Controllers} from 'node-library';

class ReplyController extends Controllers.BaseController{
    
    constructor(){
        super(ReplyService);
    }

}
export default ReplyController;