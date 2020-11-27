import Service from './service';
import Repository from '../repositories/repository';
import Request from '../helpers/request.helper';
import * as PubSub from './pubsub';
declare class BaseService implements Service, PubSub.Subscriber {
    repository: Repository;
    constructor(repository?: Repository);
    processMessage(message: PubSub.Message): any;
    buildError(errorCode?: number, errorMessage?: string): {};
    documentExists: (request: Request, documentId: string) => Promise<boolean>;
    get: (request: Request, documentId: string, attributes?: any[]) => Promise<any>;
    getAll: (request: Request, query?: {}, sort?: {}, pageSize?: number, pageNum?: number, attributes?: string[]) => Promise<{
        query: any;
        sort: any;
        attributes: any;
        pageSize: number;
        pageNum: number;
        resultSize: number;
        resultTotalSize: number;
        result: any[];
    }>;
    create: (request: Request, document: any) => Promise<any>;
    update: (request: Request, documentId: string, document: any) => Promise<any>;
    updatePartial: (request: Request, documentId: string, partial: any) => Promise<any>;
    delete: (request: Request, documentId: string) => Promise<any>;
    deleteAll: (request: Request) => Promise<any>;
}
export default BaseService;
