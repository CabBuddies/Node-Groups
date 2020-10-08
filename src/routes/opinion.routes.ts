import { Router } from 'express';
import { Middlewares } from 'node-library';
import { OpinionController } from '../controllers';
import { isAuthor } from '../middlewares';
import { AuthorService } from '../services';

const router = Router()

const controller = new OpinionController();

const authorService : AuthorService = <AuthorService> (controller.service);

const validatorMiddleware = new Middlewares.ValidatorMiddleware();

router.post('/',Middlewares.authCheck(true),validatorMiddleware.validateRequestBody({
    "type": "object",
    "additionalProperties": false,
    "required": ["opinionType"],
    "properties": {
        "postId":{
            "type":"string"
        },
        "groupId":{
            "type":"string"
        },
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

router.get('/',Middlewares.authCheck(false),controller.getAll)

router.get('/:id',Middlewares.authCheck(false),controller.get)

router.delete('/:id',Middlewares.authCheck(true),isAuthor(authorService),controller.delete)

export default router;