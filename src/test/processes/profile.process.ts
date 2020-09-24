import {Test} from 'node-library';
import config from '../helpers/config.helper';

var expect = Test.Chai.expect;
var request = Test.Request;
var common = Test.Common;


interface AccessPacket{
    accessToken:string,
    responseStatus?:number
}

const baseUrl = config.HOST+config.API_BASE;

async function me(data : AccessPacket){
    data.responseStatus = data.responseStatus||200;

    let response = await request.formattedApiRequest({
        host:baseUrl,
        method:'get',
        path:config.PATH.PROFILE.ME,
        token:{
            type:'access',
            value:data.accessToken
        }
    });
    
    console.log(response)
    
    expect(response.status).to.equal(data.responseStatus)

    return response.data || {}
}


interface OptionalAccessPacket{
    [key : string]:any,
    accessToken?:string,
    responseStatus?:number
}

async function email(data : OptionalAccessPacket){
    data.responseStatus = data.responseStatus||200;

    const req : any = {
        host:baseUrl,
        method:'get',
        path:config.PATH.PROFILE.EMAIL,
        params:{
            email:data.email
        }
    };

    if(data.accessToken){
        req.token = {
            type:'access',
            value:data.accessToken
        };
    }

    let response = await request.formattedApiRequest(req);
    
    console.log(response)
    
    expect(response.status).to.equal(data.responseStatus)

    return response.data || {}
}

export {
    email,
    me
}