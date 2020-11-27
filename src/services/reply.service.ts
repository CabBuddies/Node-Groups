import {ReplyRepository} from '../repositories';
import {Helpers,Services} from 'node-library';
import {PubSubMessageTypes} from '../helpers/pubsub.helper';
import { BinderNames } from '../helpers/binder.helper';

class ReplyService extends Services.AuthorService {

    private static instance: ReplyService;
    
    private constructor() { 
        super(new ReplyRepository());
    }

    public static getInstance(): ReplyService {
        if (!ReplyService.instance) {
            ReplyService.instance = new ReplyService();
        }

        return ReplyService.instance;
    }

    create = async(request:Helpers.Request,data) => {

        data.groupId = request.raw.params['groupId'];
        data.postId = request.raw.params['postId'];

        console.log('reply.service',request,data);

        const postIdExists = await Services.Binder.boundFunction(BinderNames.POST.CHECK.ID_EXISTS)(request,data.postId)
        console.log('reply.service','create','postIdExists',postIdExists)
        if(!postIdExists)
            throw this.buildError(404,'postId not available')

        data.author = request.getUserId();

        data = Helpers.JSON.normalizeJson(data);

        console.log('reply.service','db insert',data);

        data = await this.repository.create(data);

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.REPLY.CREATED,
            data
        });

        console.log('reply.service','published message');

        return data;
    }

    get = async(request:Helpers.Request, documentId: string, attributes?: any[]) => {

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.REPLY.READ,
            data:{
                _id:documentId
            }
        });

        return await this.repository.get(documentId,attributes);
    }

    update = async(request:Helpers.Request,documentId:string,data) => {
        console.log('reply.service',request,data);

        data.lastModifiedAt = new Date();

        data = Helpers.JSON.normalizeJson(data);

        console.log('reply.service','db update',data);

        data = await this.repository.updatePartial(documentId,data);

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.REPLY.UPDATED,
            data
        });

        return data;
    }

    delete = async(request:Helpers.Request,documentId:string) => {
        let data = await this.repository.delete(documentId)

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.REPLY.DELETED,
            data
        });

        return data;
    }
}

export default ReplyService.getInstance();