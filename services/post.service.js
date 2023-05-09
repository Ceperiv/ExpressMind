const {Post} = require('../models')

module.exports = {
    createPost(carObject) {
        return Post.create(carObject);
    },
    getOneByParams(filter) {
        return Post.findOne(filter);
    },
    getPostsByParams(filter) {
        return Post.find(filter);
    },
    getPostById(id) {
        return Post.findById(id);
    },
    updatePost(carId, newPostObject) {
        return Post.findOneAndUpdate({_id: carId}, newPostObject, {new: true});
    },
    deletePost(carId) {
        return Post.deleteOne({_id: carId});
    },
}
