import * as auth from '../../processes/auth.process';
import {Test} from 'node-library';

var common = Test.Common;

describe('Auth',()=>{
    describe('Sign Out',()=>{
        it('with good refresh token', async function () {
            const data = await auth.signIn({
                email:"nihal+test1@cabbuddies.com",
                password:"strong",
                responseStatus:201
            });

            await common.wait(2000);

            console.debug(data);

            let response = await auth.signOut({
                refreshToken:data.refreshToken.value,
                responseStatus:204
            });

            console.debug(response);
        });
    })

    describe('Sign Out All',()=>{
        it('with good refresh token', async function () {
            const data = await auth.signIn({
                email:"nihal+test1@cabbuddies.com",
                password:"strong",
                responseStatus:201
            });

            await common.wait(2000);

            console.debug(data);

            let response = await auth.signOutAll({
                refreshToken:data.refreshToken.value,
                responseStatus:204
            });

            console.debug(response);
        });
    })
})