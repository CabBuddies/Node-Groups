import {Helpers,Services} from 'node-library';
import { AuthorRepository } from '../repositories';
import {PubSubMessageTypes} from '../helpers/pubsub.helper';
import { BinderNames } from '../helpers/binder.helper';

class AuthorService extends Services.BaseService {

    constructor(repository : AuthorRepository) { 
        super(repository);
    }

    isAuthor = async(request:Helpers.Request, entityId:string) => {
        return await this.repository.isAuthor(entityId,request.getUserId());
    }

    checkIdExists = async(request:Helpers.Request,id:string) => {
        try {
            const result = await this.repository.get(id);
            console.log('AuthorService','checkIdExists',result);
            if(result)
                return result._id.toString() === id;
        } catch (error) {
            console.log(error)
        }
        return false;
    }

    embedAuthorInformation = async(request:Helpers.Request,arr:object[]=[]) => {
        console.log('embedAuthorInformation',arr)
        if(arr.length === 0)
            return arr;

        const authors = {};

        for(const a of arr){
            authors[a['author']] = {};
        }

        const authorInfos = await Services.Binder.boundFunction(BinderNames.USER.EXTRACT.USER_PROFILES)(Object.keys(authors));

        for(let authorInfo of authorInfos){
            authorInfo = JSON.parse(JSON.stringify(authorInfo));
            authors[authorInfo['userId']] = authorInfo;
        }

        console.log('embedAuthorInformation',authors);

        for(let i=0;i<arr.length;i++){
            arr[i] = JSON.parse(JSON.stringify(arr[i]));
            arr[i]['author'] = authors[arr[i]['author']];
        }

        console.log('embedAuthorInformation',arr);

        return arr;
    }
/*
    checkEntityId = async(request:Helpers.Request,type,entityId) => {
        console.log('checkEntityId',entityId)
        if(entityId){
            let responses = await Services.PubSub.Organizer.publishMessage({
                request,
                type,
                data:entityId
            })
            
            console.log('checkEntityId',responses);

            let success = false;

            for(const m of responses){
                if(m){
                    if(m.data){
                        success = true;
                    }
                }
            }

            if(!success)
                throw this.buildError(404);
        }else{
            console.log('entityId unavailable')
            throw this.buildError(400,'entityId unavailable');
        }
    }

    checkQueryId = async(request:Helpers.Request,queryId) => {
        console.log('checkQueryId',queryId)
        this.checkEntityId(request,PubSubMessageTypes.QUERY.CHECK.ID_EXISTS,queryId);
    }


    checkResponseId = async(request:Helpers.Request,responseId) => {
        console.log('checkResponseId',responseId)
        this.checkEntityId(request,PubSubMessageTypes.RESPONSE.CHECK.ID_EXISTS,responseId);
    }
*/
}

export default AuthorService;