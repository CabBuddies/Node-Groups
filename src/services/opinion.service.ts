import {OpinionRepository} from '../repositories';
import {Helpers,Services} from 'node-library';
import {PubSubMessageTypes} from '../helpers/pubsub.helper';
import AuthorService from './author.service';
import { BinderNames } from '../helpers/binder.helper';
import { JSON } from 'node-library/lib/helpers';

class OpinionService extends AuthorService {

    private static instance: OpinionService;
    
    private constructor() { 
        super(new OpinionRepository());
    }

    public static getInstance(): OpinionService {
        if (!OpinionService.instance) {
            OpinionService.instance = new OpinionService();
        }

        return OpinionService.instance;
    }

    create = async(request:Helpers.Request,data) => {
        console.log('opinion.service',request,data);

        if(data.groupId){
            const groupIdExists = await Services.Binder.boundFunction(BinderNames.GROUP.CHECK.ID_EXISTS)(request,data.groupId)
            if(!groupIdExists)
                throw this.buildError(404,'groupId not available')
            delete data.postId;
        }else if(data.postId){
            const postIdExists = await Services.Binder.boundFunction(BinderNames.POST.CHECK.ID_EXISTS)(request,data.postId)
            if(!postIdExists)
                throw this.buildError(404,'postId not available')
        }else{
            throw this.buildError(400,'groupId or postId not provided')
        }

        data.author = request.getUserId();

        let post = await this.getAll(request,JSON.normalizeJson({
            author:data.author,
            groupId:data.groupId,
            postId:data.postId,
        }),{},1000);

        if(post.resultSize>0){
            for(const opinion of post.result){
                if(data.opinionType === opinion.opinionType){
                    throw this.buildError(200,opinion);
                }
                if(
                    (data.opinionType === 'upvote' && opinion.opinionType === 'downvote')
                    ||
                    (data.opinionType === 'downvote' && opinion.opinionType === 'upvote')
                ){
                    await this.delete(request,opinion._id);
                }
            }
        }

        data = Helpers.JSON.normalizeJson(data);

        console.log('opinion.service','db insert',data);

        data = await this.repository.create(data);

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.OPINION.CREATED,
            data
        });

        console.log('opinion.service','published message');

        return data;
    }


    delete = async(request:Helpers.Request,entityId) => {
        let data = await this.repository.delete(entityId)

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.OPINION.DELETED,
            data
        });

        return data;
    }
}

export default OpinionService.getInstance();