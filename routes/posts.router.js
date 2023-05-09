const {Router} = require('express');

const {postController} = require("../controllers");
const {postsMdlwr} = require("../middlewares");

const postRouter = Router()

postRouter.get(
    '/',
    postController.getAllPosts,
);
postRouter.get(
    '/:postId',
    postsMdlwr.checkIsPostIdValid,
    postsMdlwr.checkIsPostIdPresent,
    postController.getPostById,
);
postRouter.post(
    '/',
    postsMdlwr.checkIsPostBodyValid,
    postController.createPost,
);
postRouter.put(
    '/:postId',
    postsMdlwr.checkIsPostBodyValid,
    postsMdlwr.checkIsPostIdPresent,
    postController.updatePost,
);
postRouter.delete(
    '/:postId',
    postsMdlwr.checkIsPostIdValid,
    postsMdlwr.checkIsPostIdPresent,
    postController.deletePost,
);

module.exports = postRouter;

