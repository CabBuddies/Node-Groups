import * as mongoose from 'mongoose';
import Respository from './repository';
declare class BaseRepository implements Respository {
    model: mongoose.Model<any, {}>;
    constructor(model?: mongoose.Model<any, {}>);
    documentExists: (documentId: string) => Promise<boolean>;
    get: (documentId: string, attributes?: any[]) => Promise<any>;
    getOne: (query: object, attributes?: any[]) => Promise<any>;
    getAll: (query?: {}, sort?: {}, pageSize?: number, pageNum?: number, attributes?: string[]) => Promise<{
        query: {};
        sort: {};
        attributes: string[];
        pageSize: number;
        pageNum: number;
        resultSize: number;
        resultTotalSize: number;
        result: any[];
    }>;
    create: (document: any) => Promise<any>;
    update: (documentId: string, document: any) => Promise<any>;
    updatePartial: (documentId: string, partial: any) => Promise<any>;
    updateOnePartial: (query: object, partial: any) => Promise<any>;
    delete: (documentId: string) => Promise<any>;
    deleteOne: (query: object) => Promise<any>;
    deleteAll: () => Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
export default BaseRepository;
