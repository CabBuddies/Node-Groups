import * as auth from '../../processes/auth.process';
import * as profile from '../../processes/profile.process';
import {Test} from 'node-library';

var common = Test.Common;

describe('Profile',()=>{
    describe('Me',()=>{
        it('with good refreshToken', async function () {
            const data = await auth.signIn({
                email:"nihal+test1@cabbuddies.com",
                password:"strong",
                responseStatus:201
            });

            await common.wait(2000);

            console.debug(data);

            let response = await profile.me({
                accessToken:data.accessToken.value,
                responseStatus:200
            });

            console.debug(response);
        });
    })
})