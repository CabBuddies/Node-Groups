const config = {
    HOST:'http://localhost:4000',
    API_BASE:'/api/v1',
    PATH:{
        AUTH:{
            SIGN_UP:'/auth/sign_up',
            SIGN_IN:'/auth/sign_in',
            SIGN_OUT:'/auth/sign_out',
            SIGN_OUT_ALL:'/auth/sign_out_all',
            GET_ACCESS_TOKEN:'/auth/access_token'
        },
        PROFILE:{
            ME:'/user/me',
            EMAIL:'/user/:email'
        }
    }
};
export default config;