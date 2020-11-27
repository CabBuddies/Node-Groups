import { Router } from 'express';
import { Middlewares, Services } from 'node-library';
import { AccessController } from '../controllers';

const router = Router()

const controller = new AccessController();

const authorService : Services.AuthorService = <Services.AuthorService> (controller.service);

const validatorMiddleware = new Middlewares.ValidatorMiddleware();

router.post('/',Middlewares.authCheck(true,true),validatorMiddleware.validateRequestBody({
    "type": "object",
    "additionalProperties": false,
    "required": ["userId","status","role"],
    "properties": {
        "userId":{
            "type":"string"
        },
        "role":{
            "type":"string",
            "enum":["member","contributor","manager"]
        },
        "status":{
            "type":"string",
            "enum":["invited","requested"]
        },
        "customAttributes":{
            "type":"object"
        }
    }
}),controller.create)

router.post('/search',Middlewares.authCheck(false),controller.getAll)

router.get('/:id',Middlewares.authCheck(false),controller.get)

router.put('/:id',Middlewares.authCheck(true,true),validatorMiddleware.validateRequestBody({
    "type": "object",
    "additionalProperties": false,
    "required": ["status"],
    "properties": {
        "status":{
            "type":"string",
            "enum":["accepted","inviteblocked","requestblocked"]
        },
        "customAttributes":{
            "type":"object"
        }
    }
}),controller.update)

router.delete('/:id',Middlewares.authCheck(true,true),controller.delete)


export default router;