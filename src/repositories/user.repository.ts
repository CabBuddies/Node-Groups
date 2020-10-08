import {Repositories} from 'node-library';
import {User} from '../models';

class UserRepository extends Repositories.BaseRepository {
    constructor(){
        super(User);
    }

    getUsersByUserIds = async(userIds:string[]) => {
        return await this.model.find({"userId":{$in:userIds}});
    }
}

export default UserRepository;