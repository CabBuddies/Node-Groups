import {Repositories} from 'node-library';
import {Opinion} from '../models';

class OpinionRepository extends Repositories.AuthorRepository {
    constructor(){
        super(Opinion);
    }
    
}

export default OpinionRepository;