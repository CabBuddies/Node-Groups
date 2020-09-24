require('module-alias/register')
import * as express from 'express';
import * as mongoose from 'mongoose';
import app from './startup/app';
import {Config} from 'node-library';
import * as routes from './routes';

mongoose.connect(Config.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(()=>console.log('db connected'))
.catch((err : mongoose.Error)=>console.log(err));

const router :express.Router = express.Router()

router.use('/group',routes.GroupRoutes);

app.use('/api/v1',router);

app.listen(Config.PORT,()=>{
    console.log('app listening',Config.PORT);
})

Config.routesList(app);