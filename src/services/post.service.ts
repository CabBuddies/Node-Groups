import {PostRepository} from '../repositories';
import {Helpers,Services} from 'node-library';
import {PubSubMessageTypes} from '../helpers/pubsub.helper';
import StatsService from './stats.service';
import { BinderNames } from '../helpers/binder.helper';

class PostService extends StatsService {

    private static instance: PostService;
    
    private constructor() { 
        super(new PostRepository());
        Services.Binder.bindFunction(BinderNames.POST.CHECK.ID_EXISTS,this.checkIdExists);
        Services.PubSub.Organizer.addSubscriber(PubSubMessageTypes.POST.READ,this);
        Services.PubSub.Organizer.addSubscriberAll(PubSubMessageTypes.OPINION,this);
        Services.PubSub.Organizer.addSubscriber(PubSubMessageTypes.REPLY.CREATED,this);
        Services.PubSub.Organizer.addSubscriber(PubSubMessageTypes.REPLY.DELETED,this);
    }

    public static getInstance(): PostService {
        if (!PostService.instance) {
            PostService.instance = new PostService();
        }

        return PostService.instance;
    }


    processMessage(message: Services.PubSub.Message) {
        switch(message.type){
            case PubSubMessageTypes.POST.READ:
                this.postRead(message.request,message.data);
                break;
            case PubSubMessageTypes.OPINION.CREATED:
                this.opinionCreated(message.request,message.data,'postId');
                break;
            case PubSubMessageTypes.OPINION.DELETED:
                this.opinionDeleted(message.request,message.data,'postId');
                break;
            case PubSubMessageTypes.REPLY.CREATED:
                this.replyCreated(message.request,message.data);
                break;
            case PubSubMessageTypes.REPLY.DELETED:
                this.replyDeleted(message.request,message.data);
                break;
        }
    } 

    
    replyCreated(request: Helpers.Request, data: any) {        
        this.updateStat(request,data.GroupId,"replyCount",true);
    }

    replyDeleted(request: Helpers.Request, data: any) {
        this.updateStat(request,data.GroupId,"replyCount",false);
    }

    postRead(request:Helpers.Request,data: any) {
        this.updateStat(request,data._id,"viewCount",true);
    }

    create = async(request:Helpers.Request,data) => {
        console.log('post.service',request,data);

        data.groupId = request.raw.params['groupId'];

        const groupIdExists = await Services.Binder.boundFunction(BinderNames.GROUP.CHECK.ID_EXISTS)(request,data.groupId)

        console.log('post.service','postIdExists',groupIdExists);

        if(!groupIdExists)
            throw this.buildError(404);

        data.author = request.getUserId();

        console.log('group.service','db insert',data);

        data.stats = {};
        
        data = await this.repository.create(data);

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.POST.CREATED,
            data
        });

        console.log('post.service','published message');

        return data;
    }

    getAll = async(request:Helpers.Request, query = {}, sort = {}, pageSize:number = 5, pageNum:number = 1, attributes:string[] = []) => {
        const exposableAttributes = ['author','groupId','title','topics','lastModifiedAt','createdAt','active','stats','access.type'];
        if(attributes.length === 0)
            attributes = exposableAttributes;
        else
            attributes = attributes.filter( function( el:string ) {
                return exposableAttributes.includes( el );
            });
        return this.repository.getAll(query,sort,pageSize,pageNum,attributes);
    }

    get = async(request:Helpers.Request, documentId: string, attributes?: any[]) => {

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.POST.READ,
            data:{
                _id:documentId
            }
        });

        return await this.repository.get(documentId,attributes);
    }

    update = async(request:Helpers.Request,documentId:string,data) => {
        console.log('post.service',request,data);

        data.lastModifiedAt = new Date();

        //data = Helpers.JSON.normalizeJson(data);

        console.log('post.service','db update',data);

        data = await this.repository.updatePartial(documentId,data);

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.POST.UPDATED,
            data
        });

        return data;
    }

    delete = async(request:Helpers.Request,documentId) => {
        let data :any = {
            active:false
        }

        data = await this.repository.updatePartial(documentId,data);

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.POST.DELETED,
            data
        });

        return data;
    }
}

export default PostService.getInstance();