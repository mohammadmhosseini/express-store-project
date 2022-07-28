const { CategoryModel } = require("../../../models/category");
const { CategorySchema } = require("../../validators/admin/category.schema");
const createError = require("http-errors");
const Controller = require("../controller");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

class CategoryController extends Controller{
    async addCategory(req, res, next){
        try {
            await CategorySchema.validateAsync(req.body);
            const { title, parent } = req.body;
            const result = await CategoryModel.create({
                title,
                parent
            });
            if(!result) throw createError.InternalServerError("خطای داخلی");
            return res.status(StatusCodes.CREATED).json({
                statusCode : StatusCodes.CREATED,
                data : {
                    message : "دسته بندی با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async editCategoryTitle(req, res, next){
        try {
            const { id } = req.params;
            const { title } = req.body;
            await this.checkExistCategory(id);
            const updateResult = await CategoryModel.updateOne({_id : id}, {$set : {title}});
            if(updateResult.modifiedCount == 0) throw createError.InternalServerError("به روزرسانی انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                dats: {
                    message : "به روز رسانی باموفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req, res, next){
        try {
            const { id : categoryId } = req.params;
            const category = await this.checkExistCategory(categoryId);
            const deletedResult = await CategoryModel.deleteMany({
                $or: [
                    {_id : categoryId},
                    {parent : categoryId}
                ]
            });
            if(deletedResult.deletedCount == 0) throw createError.InternalServerError("حذف دسته بندی با خطا مواجه شد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message : "دسته بندی با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getAllCategories(req, res, next){
        try {
            /* const categories = await CategoryModel.aggregate([
                {
                    $lookup : {
                        from : "categories",
                        localField : "_id",
                        foreignField : "parent",
                        as : "childs"
                    }
                },
                {
                    $project : {
                        __v : 0,
                        parent : 0,
                        "childs.parent" : 0,
                        "childs.__v" : 0
                    }
                }
            ]); */
            /* const categories = await CategoryModel.aggregate([
                {
                    $match : {
                        parent : undefined
                    }
                },
                {
                    $graphLookup: {
                        from : "categories",
                        startWith : "$_id",
                        connectFromField : "_id",
                        connectToField : "parent",
                        maxDepth : 5,
                        depthField : "depth",
                        as : "childs"
                    }
                },
                {
                    $project : {
                        __v : 0,
                        parent : 0,
                        "childs.parent" : 0,
                        "childs.__v" : 0
                    }
                }
            ]); */
            
            const categories = await CategoryModel.find({parent : undefined}, {__v : 0});
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data: {
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getCategoryById(req, res, next){
        try {
            const { id } = req.params;
            /* const category = await CategoryModel.aggregate([
                {
                    $match: {
                        _id : mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup : {
                        from : "categories",
                        localField : "_id",
                        foreignField : "parent",
                        as : "childs"
                    }
                },
                {
                    $project : {
                        __v : 0,
                        parent : 0,
                        "childs.parent" : 0,
                        "childs.__v" : 0
                    }
                }
            ]); */
            const category = await CategoryModel.findOne({_id : id}, {__v : 0});
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data : {
                    category
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getAllParents(req, res, next){
        try {
            const parents = await CategoryModel.find({parent : undefined}, { __v : 0 });
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    parents
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getChildOfParents(req, res, next){
        try {
            const { parent } = req.params;
            const childs = await CategoryModel.find({parent}, { __v : 0, parent : 0 });
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    childs
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getAllCategoriesWithoutPopulate(req, res, next){
        try {
            const categories = await CategoryModel.aggregate([
                {
                    $match : {}
                }
            ]);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    categories
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistCategory(id){
        const category = await CategoryModel.findById(id);
        if(!category) throw createError.NotFound("دسته بندی یافت نشد");
        return category;
    }
}

module.exports = {
    CategoryController : new CategoryController(),
};