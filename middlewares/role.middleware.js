const {ApiError} = require("../errors");
const {statusCode} = require("../constants");
const {roleService} = require("../services");

module.exports = {
    checkIsRoleIdPresent: async (req, res, next) => {
        try {
            const {roleId} = req.params;
            const role = await roleService.getRoleByParams({_id: roleId});
            if (!role) {
                throw new ApiError('Wrong role id', statusCode.BAD_REQUEST);
            }

            req.role = role;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsRoleBodyValid:
        async (req, res, next) => {
            try {
                const {role, blocked} = req.body;
                if (role === 'member' || role === 'admin') {

                } else {
                    throw new ApiError('The field (role) mast have value: (member) or (admin)', statusCode.BAD_REQUEST);
                }
                if (blocked || blocked === false) {
                    throw new ApiError('You cannot change this value (blocked). It will be changed automatically.', statusCode.BAD_REQUEST);
                }

                next();
            } catch (e) {
                next(e);
            }
        },
}
