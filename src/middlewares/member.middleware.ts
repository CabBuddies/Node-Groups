import * as express from 'express';
import { Helpers } from "node-library";
import { AccessService } from '../services';

function isMember(accessType:string) {
    return async(req:express.Request, res:express.Response, next:express.NextFunction) => {
        const request : Helpers.Request = res.locals.request;
        const groupId:string = request.raw.params['groupId']||request.raw.params['id'];
        const canAccess = await AccessService.canUserAccessGroup(request,groupId,accessType);
        console.log('canAccess',canAccess);
        if(canAccess){
            next();
        }else{
            res.status(403).send(`You are not allowed to ${accessType} on ${groupId}`);
        }
    }
}

export default isMember;