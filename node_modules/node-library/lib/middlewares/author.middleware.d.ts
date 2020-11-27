import { AuthorService } from "../services";
import * as express from 'express';
import { Request } from "../helpers";
declare function isAuthor(service: AuthorService): (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
export default isAuthor;
