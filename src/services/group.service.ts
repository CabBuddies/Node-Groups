import { GroupRepository } from '../repositories';
import { Helpers, Services } from 'node-library';
import { PubSubMessageTypes } from '../helpers/pubsub.helper';
import StatsService from './stats.service';
import { BinderNames } from '../helpers/binder.helper';

class GroupService extends StatsService {

    private static instance: GroupService;

    private constructor() {
        super(new GroupRepository());
        Services.Binder.bindFunction(BinderNames.GROUP.CHECK.ID_EXISTS, this.checkIdExists);

        Services.PubSub.Organizer.addSubscriber(PubSubMessageTypes.GROUP.READ, this);
        Services.PubSub.Organizer.addSubscriberAll(PubSubMessageTypes.OPINION, this);
        Services.PubSub.Organizer.addSubscriberAll(PubSubMessageTypes.ACCESS, this);
        Services.PubSub.Organizer.addSubscriber(PubSubMessageTypes.POST.CREATED, this);
        Services.PubSub.Organizer.addSubscriber(PubSubMessageTypes.POST.DELETED, this);
    }

    public static getInstance(): GroupService {
        if (!GroupService.instance) {
            GroupService.instance = new GroupService();
        }

        return GroupService.instance;
    }

    processMessage(message: Services.PubSub.Message) {
        switch (message.type) {
            case PubSubMessageTypes.GROUP.READ:
                this.groupRead(message.request, message.data);
                break;
            case PubSubMessageTypes.OPINION.CREATED:
                this.opinionCreated(message.request, message.data, 'groupId');
                break;
            case PubSubMessageTypes.OPINION.DELETED:
                this.opinionDeleted(message.request, message.data, 'groupId');
                break;
            case PubSubMessageTypes.ACCESS.CREATED:
                this.accessCreated(message.request, message.data);
                break;
            case PubSubMessageTypes.ACCESS.DELETED:
                this.accessDeleted(message.request, message.data);
                break;
            case PubSubMessageTypes.POST.CREATED:
                this.postCreated(message.request, message.data);
                break;
            case PubSubMessageTypes.POST.DELETED:
                this.postDeleted(message.request, message.data);
                break;
        }
    }

    postCreated(request: Helpers.Request, data: any) {
        this.updateStat(request, data.groupId, "postCount", true);
    }

    postDeleted(request: Helpers.Request, data: any) {
        this.updateStat(request, data.groupId, "postCount", false);
    }

    accessCreated(request: Helpers.Request, data: any) {
        if(data.status==='accepted')
            this.updateStat(request, data.groupId, "memberCount", true);
    }

    accessDeleted(request: Helpers.Request, data: any) {
        //DEMO IMP
        //this.updateStat(request, data.groupId, "memberCount", false);
    }

    groupRead(request: Helpers.Request, data: any) {
        this.updateStat(request, data._id, "viewCount", true);
    }

    create = async (request: Helpers.Request, data) => {
        console.log('group.service', request, data);

        data.author = request.getUserId();

        data.stats = {};
        data.topics = [];
        data.access = {};

        console.log('Group.service', 'db insert', data);

        data = await this.repository.create(data);

        Services.PubSub.Organizer.publishMessage({
            request,
            type: PubSubMessageTypes.GROUP.CREATED,
            data
        });

        console.log('group.service', 'published message');

        return (await this.embedAuthorInformation(request, [data], ['author'], Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES)))[0];
    }

    getAll = async (request: Helpers.Request, query = {}, sort = {}, pageSize: number = 5, pageNum: number = 1, attributes: string[] = []) => {
        const exposableAttributes = ['author', 'title', 'displayPicture','plan', 'createdAt', 'lastModifiedAt', 'stats', 'access.type', 'active','customAttributes'];
        if (attributes.length === 0)
            attributes = exposableAttributes;
        else
            attributes = attributes.filter(function (el: string) {
                return exposableAttributes.includes(el);
            });

        const data = await this.repository.getAll(query, sort, pageSize, pageNum, attributes);

        data.result = await this.embedAuthorInformation(request, data.result, ['author'], Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES));

        return data;
    }

    get = async (request: Helpers.Request, documentId: string, attributes?: any[]) => {

        Services.PubSub.Organizer.publishMessage({
            request,
            type: PubSubMessageTypes.GROUP.READ,
            data: {
                _id: documentId
            }
        });

        return (await this.embedAuthorInformation(
            request,
            [await this.repository.get(documentId, attributes)],
            ['author'], Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES)
        ))[0];
    }

    update = async (request: Helpers.Request, documentId: string, data) => {
        console.log('group.service', request, data);

        //data = Helpers.JSON.normalizeJson(data);
        data.lastModifiedAt = new Date();

        console.log('Group.service', 'db update', data);

        data = await this.repository.updatePartial(documentId, data);

        Services.PubSub.Organizer.publishMessage({
            request,
            type: PubSubMessageTypes.GROUP.UPDATED,
            data
        });

        return (await this.embedAuthorInformation(request, [data], ['author'], Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES)))[0];
    }

    delete = async (request: Helpers.Request, documentId: string) => {
        let data: any = {
            active: false
        }

        data = await this.repository.updatePartial(documentId, data);

        Services.PubSub.Organizer.publishMessage({
            request,
            type: PubSubMessageTypes.GROUP.DELETED,
            data
        });

        return (await this.embedAuthorInformation(request, [data], ['author'], Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES)))[0];
    }

    deepEqual = (x, y) => {
        if (x === y) {
            return true;
        }
        else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
            if (Object.keys(x).length != Object.keys(y).length)
                return false;

            for (var prop in x) {
                if (y.hasOwnProperty(prop)) {
                    if (!this.deepEqual(x[prop], y[prop]))
                        return false;
                }
                else
                    return false;
            }

            return true;
        }
        else
            return false;
    }

}

export default GroupService.getInstance();