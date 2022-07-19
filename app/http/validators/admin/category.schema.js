const Joi = require("joi");
const { mongoDbIdPattern } = require("../../../utils/contants");

const CategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("دسته بندی وارد شده نادرست است")),
    parent: Joi.string().allow("").pattern(mongoDbIdPattern).allow("").error(new Error("فرمت شناسه ارسال شده نادرست است")),
});

module.exports = {
    CategorySchema,
};