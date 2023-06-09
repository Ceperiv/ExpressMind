const {
    tokenService,
    authService,
    userService,
    roleService,
} = require("../services");
const {statusCode} = require("../constants");

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const hashPassword = await tokenService.hashPassword(req.body.password);
            const user = await userService.createUser({...req.body, password: hashPassword});
            const {_id} = await userService.getOneByParams({email: req.body.email});
            await roleService.setRole({role: 'member', blocked: true, my_user: _id});

            res.status(statusCode.CREATE).json(user);
        } catch (e) {
            next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashPassword, _id} = req.user;
            await tokenService.comparePassword(password, hashPassword);
            const authTokens = tokenService.createAuthTokens({_id});
            await authService.saveTokens({...authTokens, my_user: _id});

            res.json({
                ...authTokens,
                user: req.user,
            })
        } catch (e) {
            next(e);
        }
    },
    refresh: async (req, res, next) => {
        try {
            const {my_user, refresh_token} = req.tokenInfo;
            await authService.deleteOneByParams({refresh_token});
            const authTokens = tokenService.createAuthTokens({_id: my_user});
            const newTokens = await authService.saveTokens({...authTokens, my_user});

            res.json({newTokens});
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const {_id, access_token} = req.tokenInfo;
            // await Auth.deleteMany({_id, access_token})
            await authService.deleteOneByParams({_id, access_token});

            res.json('logout ok)');
        } catch (e) {
            next(e);
        }
    },
}
