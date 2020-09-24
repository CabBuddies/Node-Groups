import * as auth from '../../processes/auth.process';

describe('Auth',()=>{
    describe('Sign In',()=>{
        it('with good credentials', async function () {
            const data = await auth.signIn({
                email:"nihal+test1@cabbuddies.com",
                password:"strong",
                responseStatus:201
            });

            console.debug(data);
        });

        it('with bad password', async function () {
            const data = await auth.signIn({
                email:"nihal+test1@cabbuddies.com",
                password:"weak",
                responseStatus:401
            });

            console.debug(data);
        });

        it('with bad email', async function () {
            const data = await auth.signIn({
                email:"test1000@cabbuddies.com",
                password:"strong",
                responseStatus:404
            });

            console.debug(data);
        });

        it('with bad(empty) password', async function () {
            const data = await auth.signIn({
                email:"nihal+test1@cabbuddies.com",
                password:"",
                responseStatus:401
            });

            console.debug(data);
        });
    })
})