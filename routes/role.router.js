const {Router} = require('express');
const {roleMdlwr, userMdlwr} = require("../middlewares");
const {roleController} = require("../controllers");

const roleRouter = Router()


roleRouter.get(
    '/:userId',
    userMdlwr.checkIsIdValid,
    roleController.getRoleByUserId,
);

roleRouter.put(
    '/:roleId',
    roleMdlwr.checkIsRoleIdPresent,
    roleMdlwr.checkIsRoleBodyValid,
    roleController.updateRole,
);


module.exports = roleRouter;

