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
        this.updateStat(request,data.groupId,"replyCount",true);
    }

    replyDeleted(request: Helpers.Request, data: any) {
        this.updateStat(request,data.groupId,"replyCount",false);
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

        return (await this.embedAuthorInformation(request, [data], ['author'], Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES)))[0];
    }

    getAll = async(request:Helpers.Request, query = {}, sort = {}, pageSize:number = 5, pageNum:number = 1, attributes:string[] = []) => {
        const exposableAttributes = ['author','groupId','title','body','topics','media','lastModifiedAt','createdAt','active','stats','access.type'];
        if(attributes.length === 0)
            attributes = exposableAttributes;
        else
            attributes = attributes.filter( function( el:string ) {
                return exposableAttributes.includes( el );
            });

        let restrictions = {};
        
        if(request.raw.params['groupId']){
            restrictions = {"groupId":request.raw.params['groupId']};
        }else if(request.isUserAuthenticated()){
            restrictions = {"author":request.getUserId()};
        }else {
            this.buildError(404);
        }

        query = {
            $and:[
                query,
                restrictions
            ]
        };

        const data = await this.repository.getAll(query, sort, pageSize, pageNum, attributes);
        
        data.result = await this.embedAuthorInformation(request, data.result, ['author'], Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES));

        return data;
    }

    get = async(request:Helpers.Request, documentId: string, attributes?: any[]) => {

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.POST.READ,
            data:{
                _id:documentId
            }
        });

        return (await this.embedAuthorInformation(
            request,
            [await this.repository.get(documentId, attributes)],
            ['author'], Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES)
        ))[0];
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

        return (await this.embedAuthorInformation(request, [data], ['author'], Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES)))[0];
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

        return (await this.embedAuthorInformation(request, [data], ['author'], Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES)))[0];
    }
}

export default PostService.getInstance();