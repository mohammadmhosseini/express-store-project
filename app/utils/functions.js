const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/user");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./contants");
const redisClient = require("./init_redis");

function randomNumberGen(){
    return Math.floor((Math.random() * 90000) + 10000);
}

function signAccessToken(userId){
    return new Promise(async(resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            mobile : user.mobile
        };
        const secret = ACCESS_TOKEN_SECRET_KEY;
        const options = {
            expiresIn : "1h"
        };
        JWT.sign(payload, secret, options, (err, token) => {
            if(err) reject(createError.InternalServerError("خطای سروری"));
            resolve(token);
        });
    })
}
function signRefreshToken(userId){
    return new Promise(async(resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            mobile : user.mobile
        };
        const secret = REFRESH_TOKEN_SECRET_KEY;
        const options = {
            expiresIn : "1y"
        };
        JWT.sign(payload, secret, options, async(err, token) => {
            if(err) reject(createError.InternalServerError("خطای سروری"));
            await redisClient.set(String(userId), token, {EX : (365*24*60*60)});
            resolve(token);
        });
    })
}
function vreifyRefreshToken(token){
    return new Promise(async(resolve, reject) => {
        JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if(err) reject(createError.Unauthorized("وارد حساب کاربری خود شوید"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne({mobile}, {password : 0, otp: 0});
            if(!user) reject(createError.Unauthorized("حساب کاربری یافت نشد"));
            const refreshToken = await redisClient.get(String(user._id));
            if(token === refreshToken) return resolve(mobile);
            reject(createError.Unauthorized("مجددا وارد حساب کاربری خود شوید"));
        })
    })
}

module.exports = {
    randomNumberGen,
    signAccessToken,
    signRefreshToken,
    vreifyRefreshToken
};