import { AuthorService } from "../services";
import * as express from 'express';
import { Helpers } from "node-library";

function isAuthor(service : AuthorService) {
    return async(req:express.Request, res:express.Response, next:express.NextFunction) => {
        const request : Helpers.Request = res.locals.request;
        const isAuthor = await service.isAuthor(request,req.params.id);
        console.log('isAuthor',isAuthor);
        if(isAuthor){
            next();
        }else{
            res.status(403).send('Only Author is allowed to perform this operation');
        }
    }
}

export default isAuthor;