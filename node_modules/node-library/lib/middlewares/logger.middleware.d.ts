import * as express from 'express';
declare function logger(version: string): (req: express.Request, res: express.Response, next: express.NextFunction) => void;
export { logger };
