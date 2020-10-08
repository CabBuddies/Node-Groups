import {Repositories} from 'node-library';
import {Group} from '../models';
import StatsRepository from './stats.repository';

class GroupRepository extends StatsRepository {
    constructor(){
        super(Group);
    }

}

export default GroupRepository;