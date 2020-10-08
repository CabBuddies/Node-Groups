import { Router } from 'express';
import { Middlewares } from 'node-library';
import { ReplyController } from '../controllers';
import { isAuthor } from '../middlewares';
import { AuthorService } from '../services';

const router = Router()

const controller = new ReplyController();

const authorService : AuthorService = <AuthorService> (controller.service);

const validatorMiddleware = new Middlewares.ValidatorMiddleware();

router.post('/',Middlewares.authCheck(true),validatorMiddleware.validateRequestBody({
    "type": "object",
    "additionalProperties": false,
    "required": ["postId","body"],
    "properties": {
        "postId":{
            "type":"string"
        },
        "body":{
            "type":"string"
        },
        "customAttributes":{
            "type":"object"
        }
    }
}),controller.create)

router.get('/',Middlewares.authCheck(false),controller.getAll)

router.get('/:id',Middlewares.authCheck(false),controller.get)

router.put('/:id',Middlewares.authCheck(true),isAuthor(authorService),validatorMiddleware.validateRequestBody({
    "type": "object",
    "additionalProperties": false,
    "required": ["body"],
    "properties": {
        "body":{
            "type":"string"
        },
        "customAttributes":{
            "type":"object"
        }
    }
}),controller.update)

router.delete('/:id',Middlewares.authCheck(true),isAuthor(authorService),controller.delete)


export default router;