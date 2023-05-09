const {Router} = require('express');

const { accountController} = require("../controllers");
const {accountMdlwr, userMdlwr} = require("../middlewares");

const authRouter = Router()
authRouter.post(
    '/signup',
    accountMdlwr.checkIsBodyValid,
    accountMdlwr.checkIsUserEmailUniq,
    accountController.signUp,
);

authRouter.post(
    '/login',
    accountMdlwr.checkIsBodyValid,
    userMdlwr.getUserDynamically('body', 'email'),
    accountController.login,
);
authRouter.post(
    '/refresh',
    accountMdlwr.checkIsRefreshToken,
    accountController.refresh,
);
authRouter.post(
    '/logout',
    accountMdlwr.checkIsAccessToken,
    accountController.logout,
);

module.exports = authRouter;

