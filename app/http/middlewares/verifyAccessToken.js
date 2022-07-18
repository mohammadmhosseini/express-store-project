const createError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../../models/user");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/contants");

function vreifyAccessToken(req, res, next){
    const headers = req.headers;
    const [ bearer, token ] = headers?.["access-token"]?.split(" ") || [];
    if(token && ["Bearer", "bearer"].includes(bearer)){
        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            if(err) return next(createError.Unauthorized("وارد حساب کاربری خود شوید"));
            const { mobile } = payload;
            const user = await UserModel.findOne({mobile}, {password : 0, otp: 0});
            if(!user) return next(createError.Unauthorized("حساب کاربری یافت نشد"));
            req.user = user;
            return next();
        });
    }
    else return next(createError.Unauthorized("وارد حساب کاربری خود شوید"))
}
module.exports = {
    vreifyAccessToken,
};