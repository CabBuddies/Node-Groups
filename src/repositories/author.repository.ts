import {Repositories} from 'node-library';
import * as mongoose from 'mongoose';

class AuthorRepository extends Repositories.BaseRepository {
    constructor(model : mongoose.Model<any,{}>){
        super(model);
    }

    isAuthor = async(_id:string,author:string) => {
        console.log('repository','isAuthor',_id,author);
        try {
            const result = await this.model.findOne({
                _id,
                author
            })

            console.log('repository','isAuthor',result);

            return result ? true : false ;
        } catch (error) {
            console.log(error)
        }
        return false;
    }
}

export default AuthorRepository;