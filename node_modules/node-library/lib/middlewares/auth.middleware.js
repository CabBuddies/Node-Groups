"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authCheck(required = true, hasToBeConfirmed = false, isRefresh = false) {
    console.log('AMJ', required, isRefresh);
    return function (req, res, next) {
        try {
            const request = res.locals.request;
            console.log('AMJ', request);
            if (required) {
                console.log('AMJ', required);
                if (request.hasToken == false) {
                    console.log('AMJ', 401);
                    return res.sendStatus(401);
                }
                if ((request.isTokenExpired())
                    ||
                        (request.isUserAuthenticated() == false)
                    ||
                        (isRefresh !== (request.getToken().type === 'refresh'))
                    ||
                        (hasToBeConfirmed === true && request.isUserConfirmed() === false)) {
                    console.log('AMJ', 403);
                    return res.sendStatus(403);
                }
            }
            console.log('AMJ', 'done');
            next();
        }
        catch (error) {
            console.log(error);
        }
    };
}
exports.default = authCheck;
