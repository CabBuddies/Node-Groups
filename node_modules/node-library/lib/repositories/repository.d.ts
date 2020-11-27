import * as mongoose from 'mongoose';
export default interface Repository {
    model: mongoose.Model<any, {}>;
    documentExists(documentId: string): Promise<boolean>;
    get(documentId: string, attributes?: string[]): Promise<any>;
    getOne(query: object, attributes?: string[]): Promise<any>;
    getAll(query?: any, sort?: any, pageSize?: number, pageNum?: number, attributes?: string[]): Promise<{
        query: any;
        sort: any;
        attributes: any;
        pageSize: number;
        pageNum: number;
        resultSize: number;
        resultTotalSize: number;
        result: any[];
    }>;
    create(document: any): Promise<any>;
    update(documentId: string, document: any): Promise<any>;
    updatePartial(documentId: string, document: any): Promise<any>;
    updateOnePartial(query: object, document: any): Promise<any>;
    delete(documentId: string): Promise<any>;
    deleteOne(query: object): Promise<any>;
    [propName: string]: any;
}
