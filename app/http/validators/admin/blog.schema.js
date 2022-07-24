const Joi = require("joi");
const createError = require("http-errors");
const { mongoDbIdPattern } = require("../../../utils/contants");

const createBlogSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان وارد شده نادرست است")),
    text : Joi.string().error(createError.BadRequest("متن وارد شده نادرست است")),
    short_text : Joi.string().error(createError.BadRequest("متن وارد شده نادرست است")),
    tags : Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمیتواند بیشتر از 20 آیتم باشد")),
    category : Joi.string().pattern(mongoDbIdPattern).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    fileUploadPath: Joi.allow(),
    filename: Joi.allow()
})

module.exports = {
    createBlogSchema,
};
