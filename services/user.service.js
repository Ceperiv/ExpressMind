const {User} = require('../models')

module.exports = {
    getAllUsers(filter = {}) {
        return User.find(filter).select(['+my_role']).populate('my_role');
    },
    getOneByParams(filter) {
        return User.findOne(filter);
    },
    createUser(userObj) {
        return User.create(userObj);
    },
    getUserById(id) {
        return User.findById(id)
            .select(['+my_role']).populate('my_role');
    },
    updateUser(userId, newUserObject) {
        return User.findOneAndUpdate({_id: userId}, newUserObject, {new: true});
    },
    deleteUser(userId) {
        return User.deleteOne({_id: userId});
    },
}
