import {Repositories} from 'node-library';
import {UserRelation} from '../models';

class UserRelationRepository extends Repositories.AuthorRepository {
    constructor(){
        super(UserRelation);
    }

    isFollower = async(followeeId:string,followerId:string) => {
        return this.model.findOne({
            followeeId,
            followerId,
            status:'accepted'
        });
    }

    getRequestedFollowers = async(userId:string) => {
        return this.model.find({
            followeeId:userId,
            status:'requested'
        });
    }

    getAcceptedFollowers = async(userId:string) => {
        return this.model.find({
            followeeId:userId,
            status:'accepted'
        });
    }

    getRejectedFollowers = async(userId:string) => {
        return this.model.find({
            followeeId:userId,
            status:'rejected'
        });
    }

    getRequestedFollowees = async(userId:string) => {
        return this.model.find({
            followerId:userId,
            status:'requested'
        });
    }

    getAcceptedFollowees = async(userId:string) => {
        return this.model.find({
            followerId:userId,
            status:'accepted'
        });
    }

    getRejectedFollowees = async(userId:string) => {
        return this.model.find({
            followerId:userId,
            status:'rejected'
        });
    }

}

export default UserRelationRepository;