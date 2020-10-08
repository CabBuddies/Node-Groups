import { Router } from 'express';
import { Middlewares } from 'node-library';
import { PostController } from '../controllers';
import { isAuthor } from '../middlewares';
import { AuthorService } from '../services';

const router = Router()

const controller = new PostController();

const authorService : AuthorService = <AuthorService> (controller.service);


const validatorMiddleware = new Middlewares.ValidatorMiddleware();

router.post('/',Middlewares.authCheck(true),validatorMiddleware.validateRequestBody({
    "type": "object",
    "additionalProperties": false,
    "required": ["groupId","title","body","topics"],
    "properties": {
        "groupId":{
            "type":"string"
        },
        "title":{
            "type":"string"
        },
        "body":{
            "type":"string"
        },
        "topics":{
            "type": "array",
            "uniqueItems": true,
            "items": {
                "type": "string"
            }
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
    "required": ["title","body","topics"],
    "properties": {
        "title":{
            "type":"string"
        },
        "body":{
            "type":"string"
        },
        "topics":{
            "type": "array",
            "uniqueItems": true,
            "items": {
                "type": "string"
            }
        },
        "customAttributes":{
            "type":"object"
        }
    }
}),controller.update)

router.delete('/:id',Middlewares.authCheck(true),isAuthor(authorService),controller.delete)


export default router;