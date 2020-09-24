import {GroupRepository} from '../repositories';
import {Services,Helpers} from 'node-library';

class GroupService extends Services.BaseService {
    constructor(){
        super(new GroupRepository());
    }

   
}

export default GroupService;