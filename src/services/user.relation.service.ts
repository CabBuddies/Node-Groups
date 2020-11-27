import {UserRelationRepository} from '../repositories';
import {Helpers,Services} from 'node-library';
import {PubSubMessageTypes} from '../helpers/pubsub.helper';
import { BinderNames } from '../helpers/binder.helper';

class UserRelationService extends Services.BaseService {

    private static instance: UserRelationService;
    
    private constructor() { 
        super(new UserRelationRepository());
        Services.Binder.bindFunction(BinderNames.USER_RELATION.CHECK.IS_FOLLOWER,this.checkIsFollower);
    }

    public static getInstance(): UserRelationService {
        if (!UserRelationService.instance) {
            UserRelationService.instance = new UserRelationService();
        }

        return UserRelationService.instance;
    }

    checkIsFollower = async(followeeId:string,followerId:string) => {
        return await this.repository.isFollower(followeeId,followerId);
    }

}

export default UserRelationService.getInstance();