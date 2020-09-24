import {Repositories} from 'node-library';
import {Group} from '../models';

class GroupRepository extends Repositories.BaseRepository {
    constructor(){
        super(Group);
    }

}

export default GroupRepository;