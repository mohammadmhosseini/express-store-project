const Joi = require("joi");
const createError = require("http-errors");
const { mongoDbIdPattern } = require("../../../utils/contants");

const createCourseSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان وارد شده نادرست است")),
    text : Joi.string().error(createError.BadRequest("متن وارد شده نادرست است")),
    short_text : Joi.string().error(createError.BadRequest("متن وارد شده نادرست است")),
    tags : Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمیتواند بیشتر از 20 آیتم باشد")),
    category : Joi.string().regex(mongoDbIdPattern).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    price : Joi.number().error(createError.BadRequest("قیمت وارد شده نادرست است")),
    discount : Joi.number().error(createError.BadRequest("تخفیف وارد شده نادرست است")),
    type : Joi.string().regex(/(cash|free|special)/i).error(createError.BadRequest("نوع محصول فقط میتواند فیزیکی یا مجازی باشد")),
    fileUploadPath: Joi.allow(),
    filename: Joi.allow()
})

module.exports = {
    createCourseSchema,
};
