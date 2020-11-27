import * as express from 'express';
import Service from '../services/service';
export default interface Controller {
    service?: Service;
    get?(req: express.Request, res: express.Response): any;
    getAll?(req: express.Request, res: express.Response): any;
    create?(req: express.Request, res: express.Response): any;
    update?(req: express.Request, res: express.Response): any;
    updatePartial?(req: express.Request, res: express.Response): any;
    delete?(req: express.Request, res: express.Response): any;
}
