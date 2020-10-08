import {OpinionService} from '../services';
import {Controllers} from 'node-library';

class OpinionController extends Controllers.BaseController{
    
    constructor(){
        super(OpinionService);
    }

}
export default OpinionController;