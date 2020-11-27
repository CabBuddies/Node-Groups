import * as express from 'express';
import { Request } from '../helpers';
import { BaseService } from '../services';
declare function checkDocumentExists(service: BaseService, paramName?: string): (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
export default checkDocumentExists;
