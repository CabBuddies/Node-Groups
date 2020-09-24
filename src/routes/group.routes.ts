import * as express from 'express';
import { Router } from 'express';
import { Middlewares } from 'node-library';
import { GroupController } from '../controllers'

const router = Router()

const groupController = new GroupController()

//router.post('/',LoggerMiddleware('v1'),userController.create)

//router.get('/',Middlewares.authCheck(false),userController.getAll)

//router.get('/me',Middlewares.authCheck(true),userController.getMe)

//router.get('/:email',Middlewares.authCheck(false),userController.getEmail)

//router.delete('/delete_all',userController.deleteAll)

export{ router }