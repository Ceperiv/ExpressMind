const {Role} = require("../models");

module.exports = {
    setRole(roleObj) {
        return Role.create(roleObj);
    },

    getRoleByParams(filter) {
        return Role.find(filter);
    },

    updateRoleById(roleId, newRoleObject) {
        return Role.findOneAndUpdate({_id: roleId}, newRoleObject, {new: true});
    },

    deleteRole: async (userId) => {
        await Role.findOneAndDelete({my_user: userId});
    },
}
