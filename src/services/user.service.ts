import {UserRepository} from '../repositories';
import {Helpers,Services} from 'node-library';
import {PubSubMessageTypes} from '../helpers/pubsub.helper';
import { BinderNames } from '../helpers/binder.helper';

class UserService extends Services.BaseService {

    private static instance: UserService;
    
    private constructor() { 
        super(new UserRepository());
        Services.Binder.bindFunction(BinderNames.USER.EXTRACT.USER_PROFILES,this.getUsersByUserIds);
    }

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    getUsersByUserIds = async(userIds:string[]) => {
        return await this.repository.getUsersByUserIds(userIds);
    }

}

export default UserService.getInstance();