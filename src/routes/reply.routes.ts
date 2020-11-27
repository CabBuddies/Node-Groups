import { Router } from 'express';
import { Services,Middlewares } from 'node-library';
import { ReplyController } from '../controllers';
import { isMember } from '../middlewares';

const router = Router()

const controller = new ReplyController();

const authorService : Services.AuthorService = <Services.AuthorService> (controller.service);

const validatorMiddleware = new Middlewares.ValidatorMiddleware();

router.post('/',Middlewares.authCheck(true),isMember('post'),validatorMiddleware.validateRequestBody({
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
}),controller.create)

router.post('/search',Middlewares.authCheck(false),isMember('view'),controller.getAll)

router.get('/:id',Middlewares.authCheck(false),isMember('view'),controller.get)

router.put('/:id',Middlewares.authCheck(true),isMember('post'),Middlewares.isAuthor(authorService),validatorMiddleware.validateRequestBody({
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

router.delete('/:id',Middlewares.authCheck(true),isMember('post'),Middlewares.isAuthor(authorService),controller.delete)


export default router;