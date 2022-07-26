const createHttpError = require("http-errors");
const Joi = require("joi");
const { mongoDbIdPattern } = require("../../utils/contants");

const objectIdValiadator = Joi.object({
    id: Joi.string().pattern(mongoDbIdPattern).error(createHttpError.BadRequest("شناسه وارد شده نادرست است"))
});

module.exports = {
    objectIdValiadator,
};