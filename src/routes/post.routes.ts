import { Router } from 'express';
import { Services,Middlewares } from 'node-library';
import ReplyRoutes from './reply.routes';
import { PostController } from '../controllers';
import { isMember } from '../middlewares';
import OpinionRoutes from './opinion.routes';

const router = Router()

const controller = new PostController();

const authorService : Services.AuthorService = <Services.AuthorService> (controller.service);


const validatorMiddleware = new Middlewares.ValidatorMiddleware();


router.param('id',Middlewares.addParamToRequest());

router.param('postId',Middlewares.addParamToRequest());

router.post('/',Middlewares.authCheck(true),isMember('post'),validatorMiddleware.validateRequestBody({
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
}),controller.create)

router.post('/search',Middlewares.authCheck(false),isMember('view'),controller.getAll)

router.get('/:id',Middlewares.authCheck(false),isMember('view'),controller.get)

router.put('/:id',Middlewares.authCheck(true),isMember('post'),Middlewares.isAuthor(authorService),validatorMiddleware.validateRequestBody({
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

router.delete('/:id',Middlewares.authCheck(true),isMember('post'),Middlewares.isAuthor(authorService),controller.delete)

const postExists = Middlewares.checkDocumentExists(authorService,'postId');

router.use('/:postId/reply',postExists,ReplyRoutes);
router.use('/:postId/opinion',postExists,OpinionRoutes);

export default router;