import { AuthorRepository } from '../repositories';
import Request from '../helpers/request.helper';
import BaseService from './base.service';
declare class AuthorService extends BaseService {
    constructor(repository: AuthorRepository);
    isAuthor: (request: Request, entityId: string) => Promise<any>;
    checkIdExists: (request: Request, id: string) => Promise<any>;
    embedAuthorInformation: (request: Request, arr: object[], attributes: string[], extractUserProfiles: Function) => Promise<object[]>;
}
export default AuthorService;
