const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const path = require("path");
const { BlogModel } = require("../../../models/blog");
const createError = require("http-errors");
const { deleteFileInPublic } = require("../../../utils/functions");
const { StatusCodes } = require("http-status-codes");

class BlogController extends Controller{
    async createBlog(req, res, next){
        try {
            const data = await createBlogSchema.validateAsync(req.body);
            const imagePath = path.join(data.fileUploadPath, data.filename);
            req.body.image = imagePath.replace(/\\/g, "/");
            const { title, text, short_text, category, tags} = data;
            const author = req.user._id;
            const result = await BlogModel.create({
                author,
                title,
                text,
                short_text,
                category,
                tags,
                image: req.body.image
            })
            if(!result) throw createError.InternalServerError("بلاگ جدید ایجاد نشد");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "بلاگ جدید با موفقیت ایجاد شد"
                }
            });
        } catch (error) {
            deleteFileInPublic(req?.body?.image);
            next(error)
        }
    }
    async updateBlogById(req, res, next){
        try {
            const { id } = req.params;
            await this.findBlog(id);
            if(req.body.fileUploadPath && req.body.filename){
                const imagePath = path.join(data.fileUploadPath, data.filename);
                req.body.image = imagePath.replace(/\\/g, "/");
            }
            const data = req.body;
            let nullishData = ["", " ", "0", 0, null, undefined];
            let blackListData = ["likes", "dislikes", "comments", "bookmarks", "author"];
            Object.keys(data).forEach(key => {
                if(blackListData.includes(key)) delete data[key];
                if(typeof data[key] == "string") data[key] = data[key].trim();
                if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
                if(nullishData.includes(data[key])) delete data[key];
            });
            const updateResult = await BlogModel.updateOne({_id : id}, {$set: data});
            if(updateResult.modifiedCount == 0) throw createError.InternalServerError("به روزرسانی انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "به روزرسانی باموفقیت انجام شد"
                }
            });
        } catch (error) {
            deleteFileInPublic(req?.body?.image);
            next(error)
        }
    }
    async removeBlogById(req, res, next){
        try {
            const { id } = req.params;
            await this.findBlog({_id : id});
            const result = await BlogModel.deleteOne({_id: id});
            if(result.deletedCount == 0) throw createError.InternalServerError("حذف مقاله انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "حذف مقاله با موفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getListOfBlogs(req, res, next){
        try {
            const blogs = await BlogModel.aggregate([
                { $match : {} },
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $project: {
                        "author.__v" : 0,
                        "author.role" : 0,
                        "author.bills" : 0,
                        "author.otp" : 0,
                        "category.parent" : 0,
                        "category.__v" : 0
                    }
                }
            ])
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    blogs
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getOneBlogById(req, res, next){
        try {
            const { id } = req.params;
            const blog = await this.findBlog({_id : id});
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data: {
                    blog
                }
            });
        } catch (error) {
            next(error)
        }
    }
    getCommentsOfBlog(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async findBlog(id){
        const blog = await BlogModel.findById(id).populate([{path : "author", select : "mobile"}, {path : "category", select : "title"}]);
        if(!blog) throw createError.NotFound("مقاله ای یافت نشد");
        return blog;
    }
}

module.exports = {
    BlogController : new BlogController(),
};