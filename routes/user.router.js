const {Router} = require('express');

const {userController} = require("../controllers");
const {
    userMdlwr,
    accountMdlwr,
} = require("../middlewares");

const userRouter = Router()

userRouter.get(
    '/',
    userController.getAllUsers,
);
userRouter.get(
    '/:userId',
    userMdlwr.checkIsIdValid,
    userMdlwr.checkIsUserIdPresent,
    userController.getUserById,
);
userRouter.put(
    '/:userId',
    userMdlwr.checkIsIdValid,
    accountMdlwr.checkIsAccessToken,
    accountMdlwr.checkIsBodyValid,
    accountMdlwr.checkIsUserEmailUniq,
    userController.updateUser,
);
userRouter.delete(
    '/:userId',
    userMdlwr.checkIsIdValid,
    // accountMdlwr.checkIsAccessToken,
    userMdlwr.checkIsUserIdPresent,
    userController.deleteUser,
);

module.exports = userRouter;

