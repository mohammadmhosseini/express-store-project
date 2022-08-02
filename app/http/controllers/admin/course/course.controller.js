const { CourseModel } = require("../../../../models/course");
const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { createCourseSchema } = require("../../../validators/admin/course.schema");
const createError = require("http-errors");
const { default: mongoose } = require("mongoose");

class CourseController extends Controller{
    async getListOfCourses(req, res, next){
        try {
            const { search } = req.query;
            let courses;
            if(search) courses = await CourseModel.find({
                $text : {
                    $search : search
                }
            }).sort({_id : -1});
            else courses = await CourseModel.find({}).sort({_id : -1});
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    courses
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async addCourse(req, res, next){
        try {
            const data = await createCourseSchema.validateAsync(req.body);
            const { fileUploadPath, filename, title, text, short_text, tags, category, type, price, discount } = data;
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
            const teacher = req.user._id;
            if(Number(price) > 0 && type === "free") throw createError.BadRequest("برای محصول رایگان نمیتوان قیمت ثبت کرد");
            const course = await CourseModel.create({
                fileUploadPath,
                filename,
                title, 
                text, 
                short_text, 
                tags, 
                category, 
                type, 
                price, 
                discount, 
                image,
                teacher,
                time : "00:00:00",
                status: "NotStarted"
            })
            if(!course?._id) throw createError.InternalServerError("دوره ثبت نشد");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "دوره باموفقیت ثبت شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getCourseById(req, res, next){
        try {
            const { id } = req.params;
            const course = await this.findCourse(id);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    course
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async findCourse(courseId){
        if(!mongoose.isValidObjectId(courseId)) throw createError.BadRequest("فرمت شناسه ارسال شده نادرست است");
        const course = await CourseModel.findById(courseId);
        if(!course) throw createError.NotFound("دوره یافت نشد")
        return course;
    }
}

module.exports = {
    CourseController : new CourseController(),
};