import {Repositories} from 'node-library';
import {Opinion} from '../models';
import AuthorRepository from './author.repository';

class OpinionRepository extends AuthorRepository {
    constructor(){
        super(Opinion);
    }
    
}

export default OpinionRepository;