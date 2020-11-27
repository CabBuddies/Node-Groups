import * as express from 'express';
import Request from '../helpers/request.helper';
export default function authCheck(required?: boolean, hasToBeConfirmed?: boolean, isRefresh?: boolean): (req: express.Request, res: express.Response, next: express.NextFunction) => express.Response<any>;
