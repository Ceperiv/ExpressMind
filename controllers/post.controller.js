const {postService} = require("../services");
const {statusCode} = require("../constants");

module.exports = {
    getAllPosts: async (req, res, next) => {
        try {
            const allPosts = await postService.getPostsByParams();

            res.json(allPosts);
        } catch (e) {
            next(e);
        }
    },

    getPostById: async (req, res, next) => {
        try {
            const {post} = req;

            res.json(post);
        } catch (e) {
            next(e);
        }
    },
    createPost: async (req, res, next) => {
        try {
            const post = await postService.createPost(req.body);

            res.status(statusCode.CREATE).json(post);
        } catch (e) {
            next(e);
        }
    },
    updatePost: async (req, res, next) => {
        try {
            const {postId} = req.params;
            const post = await postService.updatePost(postId, req.body);

            res.status(statusCode.CREATE).json(post);
        } catch (e) {
            next(e);
        }
    },
    deletePost: async (req, res, next) => {
        try {
            const {postId} = req.params;
            await postService.deletePost(postId);

            res.status(statusCode.NO_CONTENT).json('done');
        } catch (e) {
            next(e);
        }
    },
}
