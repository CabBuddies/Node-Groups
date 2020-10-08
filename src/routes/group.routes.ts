import { Router } from 'express';
import { Helpers, Middlewares } from 'node-library';
import { GroupController } from '../controllers';
import { isAuthor } from '../middlewares';
import { AuthorService } from '../services';

const router = Router()

const controller = new GroupController();

const authorService : AuthorService = <AuthorService> (controller.service);

const validatorMiddleware = new Middlewares.ValidatorMiddleware();

const schema = {
    "type": "object",
    "additionalProperties": false,
    "required": ["title","description"],
    "properties": {
        "title": {
            "type":"string"
        },
        "description": {
            "type":"string"
        },
        "displayPicture": {
            "type":"string"
        },
        "customAttributes":{
            "type":"object"
        }
    }
};

router.post('/',Middlewares.authCheck(true),validatorMiddleware.validateRequestBody(schema),controller.create)

router.get('/',Middlewares.authCheck(false),controller.getAll)

router.get('/:id',Middlewares.authCheck(false),controller.get)

router.put('/:id',Middlewares.authCheck(true),isAuthor(authorService),validatorMiddleware.validateRequestBody(schema),controller.update)

router.delete('/:id',Middlewares.authCheck(true),isAuthor(authorService),controller.delete)

export default router;