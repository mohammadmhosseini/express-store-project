const Joi = require("joi");
const createError = require("http-errors");
const { mongoDbIdPattern } = require("../../../utils/contants");

const createProductSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان وارد شده نادرست است")),
    text : Joi.string().error(createError.BadRequest("متن وارد شده نادرست است")),
    short_text : Joi.string().error(createError.BadRequest("متن وارد شده نادرست است")),
    tags : Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمیتواند بیشتر از 20 آیتم باشد")),
    colors : Joi.array().min(0).max(20).error(createError.BadRequest("رنگ های انتخابی نمیتواند بیشتر از 20 آیتم باشد")),
    category : Joi.string().regex(mongoDbIdPattern).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    price : Joi.number().error(createError.BadRequest("قیمت وارد شده نادرست است")),
    discount : Joi.number().error(createError.BadRequest("تخفیف وارد شده نادرست است")),
    count : Joi.number().error(createError.BadRequest("تعداد وارد شده نادرست است")),
    width : Joi.number().allow(null, 0, "0").error(createError.BadRequest("عرض وارد شده نادرست است")),
    height : Joi.number().allow(null, 0, "0").error(createError.BadRequest("عرض وارد شده نادرست است")),
    length : Joi.number().allow(null, 0, "0").error(createError.BadRequest("عرض وارد شده نادرست است")),
    weight : Joi.number().allow(null, 0, "0").error(createError.BadRequest("عرض وارد شده نادرست است")),
    type : Joi.string().regex(/(physical|virtual)/i).error(createError.BadRequest("نوع محصول فقط میتواند فیزیکی یا مجازی باشد")),
    fileUploadPath: Joi.allow(),
    filename: Joi.allow()
})

module.exports = {
    createProductSchema,
};
