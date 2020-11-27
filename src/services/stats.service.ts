import {Helpers,Services} from 'node-library';
import { StatsRepository } from '../repositories';
import {PubSubMessageTypes} from '../helpers/pubsub.helper';

class StatsService extends Services.AuthorService {

    constructor(repository : StatsRepository) { 
        super(repository);
    }

    updateStat = async(request:Helpers.Request, entityId:string, statType:string, increase:boolean) => {
        console.log('updateStat',entityId,statType,increase);
        return await this.repository.updateStat(entityId,statType,increase);
    }

    opinionCreated = async(request:Helpers.Request, data:any, entityAttribute:string) => {
        console.log('opinionCreated',data,entityAttribute);
        if(!data[entityAttribute])
            return;
        return await this.updateStat(request, data[entityAttribute], data['opinionType']+'Count',true);
    }

    opinionDeleted = async(request:Helpers.Request, data:any, entityAttribute:string) => {
        console.log('opinionCreated',data,entityAttribute);
        if(!data[entityAttribute])
            return;
        return await this.updateStat(request, data[entityAttribute], data['opinionType']+'Count',false);
    }
}

export default StatsService;