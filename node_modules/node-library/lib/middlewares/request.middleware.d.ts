import * as express from 'express';
import Request from '../helpers/request.helper';
import { Service } from '../services';
declare function requestProcessor(service?: Service): (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
declare function addParamToRequest(): (req: express.Request, res: express.Response, next: express.NextFunction, value: any, name: string) => void;
export { requestProcessor, addParamToRequest };
