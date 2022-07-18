const createError = require("http-errors");
const { getOtpSchema, checkOtpSchema } = require("../../../validators/user/auth.schema");
const { UserModel } = require("../../../../models/user");
const { ROLES } = require("../../../../utils/contants");
const { randomNumberGen, signAccessToken, vreifyRefreshToken, signRefreshToken } = require("../../../../utils/functions");
const Controller = require("../../controller");

class UserAuthController extends Controller{
    async getOtp(req, res, next){
        try {
            await getOtpSchema.validateAsync(req.body);
            const code = randomNumberGen();
            const { mobile } = req.body;
            const result = await this.saveUser(mobile, code);
            if(!result) throw createError.Unauthorized("ورود شما انجام نشد");
            return res.status(200).json({
                data : {
                    status : 200,
                    message : "کد اعتبار سنجی با موفقیت برای شما ارسال شد",
                    code,
                    mobile
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async checkOtp(req, res, next){
        try {
            await checkOtpSchema.validateAsync(req.body);
            const { mobile, code } = req.body;
            const user = await UserModel.findOne({mobile});
            if(!user) throw createError.NotFound("کاربری یافت نشد");
            if(user.otp.code != code) throw createError.Unauthorized("کد ارسال شده نادرست است");
            const now = Date.now();
            if(+user.otp.expiresIn < now) throw createError.Unauthorized("کد ارسال شده منقضی شده است");
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
            return res.status(200).json({
                data : {
                    accessToken,
                    refreshToken
                }
        });
        } catch (error) {
            next(error)
        }
    }
    async refreshToken(req, res, next){
        try {
            const { refreshToken } = req.body;
            const mobile = await vreifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({mobile});
            const accessToken = await signAccessToken(user._id);
            const newRefreshToken = await signRefreshToken(user._id);
            return res.status(200).json({
                data : {
                    accessToken,
                    refreshToken : newRefreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async saveUser(mobile, code){
        let otp = {
            code,
            expiresIn : (new Date().getTime() + 120000)
        };
        const result = await this.checkExistUser(mobile);
        if(result){
            return (await this.UpadetUser(mobile, {otp}));
        }
        return !!(await UserModel.create({
            otp,
            mobile,
            role: [ROLES.USER]
        }));
    }
    async checkExistUser(mobile){
        const user = await UserModel.findOne({mobile});
        return !!user;
    }
    async UpadetUser(mobile, objectData = {}){
        Object.keys(objectData).forEach(key => {
            if(["", " ", "0", 0, null, undefined, NaN].includes(objectData[key])) delete objectData[key];
        });
        const updateResult = await UserModel.updateOne({mobile}, {$set : objectData});
        return !!updateResult.modifiedCount;
    }
}

module.exports = {
    UserAuthController : new UserAuthController(),
};