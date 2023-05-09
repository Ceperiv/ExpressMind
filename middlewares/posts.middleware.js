const {ApiError} = require("../errors");
const {statusCode} = require("../constants");
const {postService} = require("../services");

module.exports = {
    checkIsPostIdValid: async (req, res, next) => {
        try {
            const {postId} = req.params;
            if (postId < 0 || Number.isNaN(postId)) {
                throw new ApiError('"Id" is not valid', statusCode.BAD_REQUEST);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsPostIdPresent: async (req, res, next) => {
        try {
            const {postId} = req.params;
            const post = await postService.getPostById(postId);
            if (!post) {
                throw new ApiError('Wrong post id', statusCode.BAD_REQUEST);
            }

            req.post = post;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkIsPostBodyValid:
        async (req, res, next) => {
            try {
                const {postName, author, description} = req.body;
                if (postName.length < 2 || postName.length > 25) {
                    throw new ApiError('Post name length should be between 2 and 25 characters', statusCode.BAD_REQUEST);
                }
                if (author.length < 2 || author.length > 25) {
                    throw new ApiError('author name must be between 2 and 25 characters', statusCode.BAD_REQUEST);
                }
                if (description.length === 0) {
                    throw new ApiError('Description cannot be empty', statusCode.BAD_REQUEST);
                }
                if (description.length > 200) {
                    throw new ApiError('Description cannot be more 260 characters', statusCode.BAD_REQUEST);
                }

                next();
            } catch (e) {
                next(e);
            }
        },
}
