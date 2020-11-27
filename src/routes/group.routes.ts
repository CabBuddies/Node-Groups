import { Router } from 'express';
import { Services, Middlewares } from 'node-library';
import PostRoutes from './post.routes';
import { GroupController } from '../controllers';
import AccessRoutes from './access.routes';
import OpinionRoutes from './opinion.routes';

const router = Router()

const controller = new GroupController();

const authorService : Services.AuthorService = <Services.AuthorService> (controller.service);

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
        "plan":{
            "type":"object"
        },
        "access":{
            "type":"object",
            "required":["view","post"],
            "properties":{
                "view":{
                    "type":"string",
                    "enum":['public','member']
                },
                "post":{
                    "type":"string",
                    "enum":['member','contributor']
                }
            }
        },
        "preferences":{
            "type":"object",
            "required":["automaticMembership"],
            "properties":{
                "automaticMembership":{
                    "type":"boolean"
                }
            }
        },
        "customAttributes":{
            "type":"object"
        }
    }
};

router.param('id',Middlewares.addParamToRequest());

router.param('groupId',Middlewares.addParamToRequest());

router.post('/',Middlewares.authCheck(true),validatorMiddleware.validateRequestBody(schema),controller.create)

router.post('/search',Middlewares.authCheck(false),controller.getAll)

router.get('/:id',Middlewares.authCheck(false),controller.get)

router.put('/:id',Middlewares.authCheck(true),Middlewares.isAuthor(authorService),validatorMiddleware.validateRequestBody(schema),controller.update)

router.delete('/:id',Middlewares.authCheck(true),Middlewares.isAuthor(authorService),controller.delete)

const groupExists = Middlewares.checkDocumentExists(authorService,'groupId');

router.use('/:groupId/access',groupExists,AccessRoutes);
router.use('/:groupId/post',groupExists,PostRoutes);
router.use('/:groupId/opinion',groupExists,OpinionRoutes);

export default router;