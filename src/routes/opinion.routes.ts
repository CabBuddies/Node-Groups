import { Router } from 'express';
import { Services,Middlewares } from 'node-library';
import { OpinionController } from '../controllers';
import { isMember } from '../middlewares';

const router = Router()

const controller = new OpinionController();

const authorService : Services.AuthorService = <Services.AuthorService> (controller.service);

const validatorMiddleware = new Middlewares.ValidatorMiddleware();

router.post('/',Middlewares.authCheck(true,true),isMember('post'),validatorMiddleware.validateRequestBody({
    "type": "object",
    "additionalProperties": false,
    "required": ["opinionType"],
    "properties": {
        "body":{
            "type":"string"
        },
        "opinionType":{
            "type":"string",
            "enum":['follow','upvote','downvote','spamreport']
        },
        "customAttributes":{
            "type":"object"
        }
    }
}),controller.create)

router.post('/search',Middlewares.authCheck(false),isMember('view'),controller.getAll)

router.get('/:id',Middlewares.authCheck(false),isMember('view'),controller.get)

router.delete('/:id',Middlewares.authCheck(true,true),isMember('post'),Middlewares.isAuthor(authorService),controller.delete)

export default router;