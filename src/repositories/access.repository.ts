import {Repositories} from 'node-library';
import * as mongoose from 'mongoose';
import Access from '../models/access.model';

class AccessRepository extends Repositories.AuthorRepository {
    constructor(){
        super(Access);
    }

    groupAccess = async(groupId:string,userId:string,roles:string[]=['member','contributor','manager']) => {
        return await this.model.findOne({
            groupId,
            userId,
            role:{$in:roles},
            status:'accepted'
        });
    }

    getAccessDocument = async(entityId:string,author:string) => {
        return await this.model.findOne({_id:entityId,author});
    }
}

export default AccessRepository;