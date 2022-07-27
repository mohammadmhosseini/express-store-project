const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/user");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./contants");
const redisClient = require("./init_redis");
const path = require("path");
const fs = require("fs");

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
            expiresIn : "1d"
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

function deleteFileInPublic(...fileAddress){
    if(fileAddress){
        const filePath = path.join(__dirname, "..", "..", "public", fileAddress);
        if(fs.existsSync(filePath)) return fs.unlinkSync(filePath);
    }
}

function listOfImagesFromRequest(files, fileUploadPath){
    if(files?.length > 0){
        return ((files.map(file => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/g, "/")));
    }else{
        return [];
    }
}

function setFeatures(body){
    const { width, height, weight, length, colors } = body;
    let features = {};
    features.colors = colors
    if(!isNaN(+width) || !isNaN(+length) || !isNaN(+height) || !isNaN(+weight)){
        if(!width) features.width = 0;
        else features.width = +width;
        if(!height) features.height = 0;
        else features.height = +height;
        if(!length) features.length = 0;
        else features.length = +length;
        if(!weight) features.weight = 0;
        else features.weight = +weight;
    }
    return features;
}

function copyObject(object){
    return JSON.parse(JSON.stringify(object));
}

function deleteInvalidPropertyInObject(data = {}, blackListFields = []){
    let nullishData = [0, null, undefined, " ", "0", ""];
    Object.keys(data).forEach(key => {
        if(nullishData.includes(data[key])) delete data[key];
        if(blackListFields.includes(key)) delete data[key];
        if(typeof data[key] == "string") data[key].trim();
        if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
        if(Array.isArray(data[key]) && data[key].length == 0) delete data[key]
    });
}

module.exports = {
    randomNumberGen,
    signAccessToken,
    signRefreshToken,
    vreifyRefreshToken,
    deleteFileInPublic,
    listOfImagesFromRequest,
    setFeatures,
    copyObject,
    deleteInvalidPropertyInObject
};