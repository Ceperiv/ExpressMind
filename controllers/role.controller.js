const {roleService} = require("../services");
const {statusCode} = require("../constants");

module.exports = {
    getRoleByUserId: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const role = await roleService.getRoleByParams({my_user: userId});

            res.json(role);
        } catch (e) {
            next(e);
        }
    },
    updateRole: async (req, res, next) => {
        try {
            const {role} = req.body;
            let blocked;
            if (role === 'member') blocked = true;
            if (role === 'admin') blocked = false;
            const {roleId} = req.params;
            const myRole = await roleService.updateRoleById(roleId, {role, blocked});

            res.status(statusCode.CREATE).json(myRole);
        } catch (e) {
            next(e);
        }
    },
}
