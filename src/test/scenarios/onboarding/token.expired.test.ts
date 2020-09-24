import * as auth from '../../processes/auth.process';

import {Test} from 'node-library';

var common = Test.Common;

describe('Auth', function () {
    describe('Request Access Token', function () {
        it('with good refreshToken', async function () {

            const data = await auth.signIn({
                email:"nihal+test1@cabbuddies.com",
                password:"strong",
                responseStatus:201
            });

            await common.wait(2000);

            console.debug(data);

            let response = await auth.getAccessToken({
                refreshToken:data.refreshToken.value,
                responseStatus:201
            });

            console.debug(response);

            const accessToken = common.jsonStructure(response,['accessToken','value']);

        });
    });
});