const Joi = require("joi");

const getOtpSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/im).error(new Error("موبایل وارد شده نادرست است")),
});
const checkOtpSchema = Joi.object({
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/im).error(new Error("موبایل وارد شده نادرست است")),
    code : Joi.string().min(4).max(6).error(new Error("کد رسال شده صحیح نمیباشد"))
})

module.exports = {
    getOtpSchema,
    checkOtpSchema
};