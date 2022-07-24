const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../../models/user");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/contants");

function getToken(headers){
    /* const [ bearer, token ] = headers?.["access-token"]?.split(" ") || []; */
    const [ bearer, token ] = headers?.authorization?.split(" ") || [];
    if(token && ["Bearer", "bearer"].includes(bearer)) return token;
    throw createError.Unauthorized("حساب کاربری شناسایی نشد مجددا وارد حساب کاربری خود شوید");
}

function vreifyAccessToken(req, res, next){
    try {
        const token = getToken(req.headers);
        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            try {
                if(err) throw createError.Unauthorized("وارد حساب کاربری خود شوید");
                const { mobile } = payload;
                const user = await UserModel.findOne({mobile}, {password : 0, otp: 0});
                if(!user) throw createError.Unauthorized("حساب کاربری یافت نشد");
                req.user = user;
                return next();
            } catch (error) {
                next(error)
            }
        });
    } catch (error) {
        next(error)
    }
}

function checkRole(role){
    return function(req, res, next){
        try {
            const user = req.user;
            if(user.role.includes(role)) return next();
            throw createError.Forbidden("شما به محتوای این بخش دسترسی ندارید")
        } catch (error) {
            next(error)
        }
    }
}
    
module.exports = {
    vreifyAccessToken,
    checkRole
};