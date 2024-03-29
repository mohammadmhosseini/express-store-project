const { CourseModel } = require("../../../../models/course");
const Controller = require("../../controller");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { createCourseSchema } = require("../../../validators/admin/course.schema");
const createError = require("http-errors");
const { default: mongoose } = require("mongoose");
const {copyObject, deleteInvalidPropertyInObject, deleteFileInPublic} = require("../../../../utils/functions");

const courseBlackList = {
    LIKES : "likes",
    DISLIKES : "dislikes",
    BOOKMARKS : "bookmarks",
    FILENAME : "filename",
    FILEUPLOADPATH : "fileUploadPath",
    STUDENTS : "students",
    CHAPTERS : "chapters",
    COMMENTS : "comments"
};
Object.freeze(courseBlackList);

class CourseController extends Controller{
    async getListOfCourses(req, res, next){
        try {
            const { search } = req.query;
            let courses;
            if(search) courses = await CourseModel
            .find({
                $text : {
                    $search : search
                }
            })
            .populate([
                {path : "category", select: {title: 1}},
                {path : "teacher", select: { first_name : 1, last_name : 1, mobile : 1, email : 1}}
            ])
            .sort({_id : -1});
            else courses = await CourseModel
            .find({})
            .populate([
                {path : "category", select : {title: 1}},
                {path : "teacher", select : { first_name : 1, last_name : 1, mobile : 1, email : 1}}
            ])
            .sort({_id : -1});
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    courses
                }
            });
        } catch (error) {
            console.log(error);
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
    async updateCourseById(req, res, next){
        try {
            const {id} = req.params;
            const course = await this.findCourse(id);
            const {filename, fileUploadPath} = req.body;
            const data = copyObject(req.body);
            let BlackListFields = Object.values(courseBlackList);
            deleteInvalidPropertyInObject(data, BlackListFields);
            if(req.file){
                data.image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
                deleteFileInPublic(course.image);
            }
            const updateCourseResult = await CourseModel.updateOne({_id : id}, {
                $set : data
            });
            if(!updateCourseResult.modifiedCount) throw createError.InternalServerError("ویرایش دوره انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data: {
                    message: "ویرایش دوره با موفقیت انجام شد"
                }
            });
        } catch (error) {
            console.log(error);
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