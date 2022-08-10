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

function deleteFileInPublic(fileAddress){
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

function getTime(seconds){
    let total = Math.round(seconds) / 60;
    let [minutes, percent] = String(total).split(".");
    let second = Math.round((percent * 60) / 100).toString().substring(0,2);
    let hour = 0;
    if(minutes > 60){
        total = Math.round(minutes) / 60;
        let [h, percent] = String(total).split(".");
        hour = h;
        minutes = Math.round((percent * 60) / 100).toString().substring(0, 2);
    }
    if(String(hour).length == 1) hour = `0${hour}`;
    if(String(minutes).length == 1) minutes = `0${minutes}`;
    if(String(second).length == 1) second = `0${second}`;
    return (hour + ":" + minutes + ":" + second);
}
function getTimeOfCourse(chapters = []){
    let time, hour, minute, second = 0;
    for (const chapter of chapters) {
        if(Array.isArray(chapter?.episodes)){
            for (const episode of chapter.episodes) {
                if(episode?.time) time = episode.time.split(":");
                else time = "00:00:00".split(":");
                if(time.length == 3){
                    second += Number(time[0]) * 3600;
                    second += Number(time[1]) * 60;
                    second += Number(time[2]);
                }
                else if(time.length == 2){
                    second += Number(time[0]) * 60;
                    second += Number(time[1]);
                }
            }
        }
    }
    hour = Math.floor(second / 3600);
    minute = Math.floor(second / 60) % 60;
    second = Math.floor(second) % 60;
    if(String(hour).length == 1) hour = `0${hour}`;
    if(String(minute).length == 1) minute = `0${minute}`;
    if(String(second).length == 1) second = `0${second}`;
    return (hour + ":" + minute + ":" + second);
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
    deleteInvalidPropertyInObject,
    getTime,
    getTimeOfCourse
};