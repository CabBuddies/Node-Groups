import {Repositories} from 'node-library';
import * as mongoose from 'mongoose';

class StatsRepository extends Repositories.AuthorRepository {
    constructor(model : mongoose.Model<any,{}>){
        super(model);
    }

    updateStat = async(entityId:string,property:string,increase:boolean) => {
        const query = {}
        query["stats."+property] = increase ? 1 : -1;
        return await this.model.findOneAndUpdate({ _id:entityId },{$inc:query},{new:true})
    }
}

export default StatsRepository;