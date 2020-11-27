import * as express from 'express';
export default class ValidatorMiddleware {
    validator: any;
    constructor(schemas?: any[]);
    addSchema(schema: any): void;
    validateRequestBody(schema: any): (req: express.Request, res: express.Response, next: express.NextFunction) => express.Response<any>;
}
