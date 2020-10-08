import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import {Middlewares} from 'node-library';

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req,res,next)=>{console.log('middleware','logger','before');next();});
app.use(Middlewares.logger('v1'));
app.use((req,res,next)=>{console.log('middleware','logger','after');next();});
app.use((req,res,next)=>{console.log('middleware','requestProcessor','before');next();});
app.use(Middlewares.requestProcessor(undefined));
app.use((req,res,next)=>{console.log('middleware','requestProcessor','after');next();});

export default app;