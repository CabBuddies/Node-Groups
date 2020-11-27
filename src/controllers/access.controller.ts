import {AccessService} from '../services';
import {Controllers} from 'node-library';

class AccessController extends Controllers.BaseController{
    
    constructor(){
        super(AccessService);
    }

}
export default AccessController;