import {Helpers,Services} from 'node-library';
import { AccessRepository } from '../repositories';
import {PubSubMessageTypes} from '../helpers/pubsub.helper';
import { BinderNames } from '../helpers/binder.helper';

class AccessService extends Services.AuthorService {

    private static instance: AccessService;
    
    private constructor() { 
        super(new AccessRepository());
    }

    public static getInstance(): AccessService {
        if (!AccessService.instance) {
            AccessService.instance = new AccessService();
        }

        return AccessService.instance;
    }

    canUserAccessGroup = async(request:Helpers.Request, groupId:string, accessType:string) => {
        
        let userId = request.getUserId();

        //extract group from database

        const group = await Services.Binder.boundFunction(BinderNames.GROUP.CHECK.ID_EXISTS)(request,groupId);
        
        console.log('access.service','canUserAccessGroup','group',group);
        
        if(!group)
            throw this.buildError(404,'group not available');

        if(accessType === 'view' && group.access.view === 'public'){
            return true;
        }

        if(!userId)
            return false;

        if(userId === group.author){
            console.log('you are the author of the group, you have admin access');
            return true;
        }

        const membership = await this.repository.groupAccess(groupId,userId);

        console.log('membership',membership);

        if(!membership)
            return false;

        /*
            REQUESTING_ACCESS_TYPE | GROUP_ACCESS_VIEW | GROUP_ACCESS_POST | ALLOW
            view                        public              *                   true

            view                        member              *                   only if authenticated user is a member(or higher role) of the group
            post                        *                   member              only if authenticated user is a member(or higher role) of the group
            post                        *                   contributor         only if authenticated user is a contributor(or higher role) of the group
            manage                      *                   *                   only if authenticated user is a manager(or higher role) of the group 
        */

        if(accessType === 'view' && group.access.view === 'member'){
            return true;
        }

        if(accessType === 'post'){
            if(group.access.post === 'member'){
                return true;
            }else if(group.access.post === 'contributor'){
                return membership.role !== 'member';
            }
        }

        if(accessType === 'manage'){
            return membership.role === 'manager';
        }

        return false;
    }

    create = async(request:Helpers.Request,data) => {

        //POST base_url/group/:groupId/access

        data.groupId = request.raw.params['groupId'];

        console.log('access.service',request,data);

        const group = await Services.Binder.boundFunction(BinderNames.GROUP.CHECK.ID_EXISTS)(request,data.groupId);
        
        console.log('access.service','create','group',group);
        
        if(!group)
            throw this.buildError(404,'group not available');

        //data.status = "granted"

        data.author = group.author;

        //"accepted","requested","requestblocked","invited","inviteblocked"
        //requested, invited

        if(data.status === 'requested'){
            data.userId = request.getUserId();
            if(data.role === 'member'){
                if(group.preferences.automaticMembership){
                    data.status = 'accepted';
                }
            }
        }else if(data.status === 'invited'){
            //check if the request.getUserId() is a manager of the group
            if(request.getUserId() === group.author){
                //admin of group is allowed to send out invitations
            }else{
                const membership = await this.repository.groupAccess(data.groupId,request.getUserId(),['manager']);

                console.log('membership',membership);

                if(!membership)
                    throw this.buildError(403,'your member role does not allow you to send out invitations for the group');
            }

            //here we know that the user trying to send invitation is either an admin or a manager

            const followerRule = await Services.Binder.boundFunction(BinderNames.USER_RELATION.CHECK.IS_FOLLOWER)(request.getUserId(),data.userId);

            if(!followerRule)
                throw this.buildError(403,'you can only send out invitations to your followers');

        }else{
            throw this.buildError(400,'invalid status');
        }

        console.log('access.service','db insert',data);

        data = await this.repository.create(data);

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.ACCESS.CREATED,
            data
        });

        console.log('access.service','published message');

        return (await this.embedAuthorInformation(request,[data],['author','userId'],
            Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES)
        ))[0];
    }

    getAll = async(request:Helpers.Request, query = {}, sort = {}, pageSize:number = 5, pageNum:number = 1, attributes:string[] = []) => {
        const exposableAttributes = ['author','groupId','userId','lastModifiedAt','createdAt','status'];
        if(attributes.length === 0)
            attributes = exposableAttributes;
        else
            attributes = attributes.filter( function( el:string ) {
                return exposableAttributes.includes( el );
            });
        
        //query['author'] = request.getUserId();
        query['groupId'] = request.raw.params['groupId'];

        const data = await this.repository.getAll(query,sort,pageSize,pageNum,attributes);

        data.result = await this.embedAuthorInformation(request,data.result,['author','userId'],
        Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES));

        return data;
    }

    get = async(request:Helpers.Request, documentId: string, attributes?: any[]) => {

        const data = await this.repository.get(documentId);
        
        console.log('data',data);

        if(!data){
            console.log('data is null or undefined',data);

            throw this.buildError(404);
        }
        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.ACCESS.READ,
            data
        });

        return (await this.embedAuthorInformation(request,[data],['author','userId'],
        Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES)))[0];
    }

    update = async(request:Helpers.Request,documentId:string,data) => {
        console.log('access.service',request,data);

        const accessRule = await this.repository.get(documentId);

        if(!accessRule)
            throw this.buildError(404);

        if(accessRule.status === 'requested'){
            //people who can edit a 'requested' type access rule are admins and managers
            
            if(request.getUserId() === accessRule.author){
                //author of the group aka the admin is trying to update a requested access rule
                
            }else{
                const membership = await this.repository.groupAccess(accessRule.groupId,request.getUserId(),['manager']);

                if(!membership)
                throw this.buildError(403);


            }

            //at this point the 'requested' type access rule is being updated by admin/manager

            if(["accepted","requestblocked"].indexOf(data.status) === -1){
                throw this.buildError(400);
            }
        }else if(accessRule.status === 'invited' || accessRule.status === 'inviteblocked'){
            if(request.getUserId() !== accessRule.userId){
                throw this.buildError(403);
            }
            if(["accepted","inviteblocked"].indexOf(data.status) === -1){
                throw this.buildError(400);
            }
        }
        
        /*
            15 -> 14 = 210
            [requestblocked,manager] => [invited,member] = not possible
        */

        data = Helpers.JSON.normalizeJson(data);

        console.log('access.service','db update',data);

        data = await this.repository.updatePartial(documentId,data);

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.ACCESS.UPDATED,
            data
        });

        return (await this.embedAuthorInformation(request,[data],['author','userId'],
        Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES)))[0];
    }

    delete = async(request:Helpers.Request,documentId:string) => {
        const accessRule = await this.repository.get(documentId);

        //inviteblocked access rules can be deleted by the users only
        //requestblocked access rules can be deleted by admin and manager
        //accepted access rules can be deleted by admin, managers, and the user themselves
        //requested access rules can be deleted by admin, managers, and the user themselves
        //invited access rules can be deleted by admin, managers, and the user themseleves

        const isTheUser = request.getUserId() === accessRule.userId;
        const isTheAdmin = request.getUserId() === accessRule.author;

        if(accessRule.status === 'inviteblocked'){
            if(!isTheUser){
                throw this.buildError(403);
            }
        }else if(accessRule.status === 'requestblocked'){
            if(!isTheAdmin){
                const membership = await this.repository.groupAccess(accessRule.groupId,request.getUserId(),['manager']);

                if(!membership)
                throw this.buildError(403);
            }
        }else{
            if(isTheUser || isTheAdmin){

            }else{
                const membership = await this.repository.groupAccess(accessRule.groupId,request.getUserId(),['manager']);

                if(!membership)
                throw this.buildError(403);
            }
        }
        
        let data = await this.repository.delete(documentId)

        Services.PubSub.Organizer.publishMessage({
            request,
            type:PubSubMessageTypes.ACCESS.DELETED,
            data
        });

        return (await this.embedAuthorInformation(request,[data],['author','userId'],
        Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES)))[0];
    }

}

export default AccessService.getInstance();