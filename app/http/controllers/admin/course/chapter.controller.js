const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { CourseModel } = require("../../../../models/course");
const { deleteInvalidPropertyInObject } = require("../../../../utils/functions");
const Controller = require("../../controller");
const { CourseController } = require("./course.controller");

class ChapterController extends Controller{
    async addChapter(req, res, next){
        try {
            const { id, title, text } = req.body;
            await CourseController.findCourse(id);
            const saveChapterResult = await CourseModel.updateOne({ _id : id }, {
                $push: {
                    chapters : {
                        title,
                        text,
                        episodes : []
                    }
                }
            });
            if(saveChapterResult.modifiedCount == 0) throw createError.InternalServerError("فصل جدید افزوده نشد");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message : "فصل جدید باموفقیت افزوده شد"
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async getChaptersOfCourse(req, res, next){
        try {
            const { courseId } = req.params;
            const course = await CourseModel.findOne({ _id : courseId }, { chapters : 1, title: 1 });
            if(!course) throw createHttpError.NotFound("دوره ای یافت نشد");
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data: {
                    course
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async removeChapterById(req, res, next){
        try {
            const {chapterID} = req.params;
            const chapter = await this.getOneChapterById(chapterID);
            console.log(chapter);
            const removeChapterResult = await CourseModel.updateOne({"chapters._id" : chapterID}, {
                $pull: {
                    chapters: {
                        _id : chapterID
                    }
                }
            });
            if(removeChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError("حذف فصل انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data: {
                    message: "حذف فصل باموفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async updateChapterById(req, res, next){
        try {
            const {chapterID} = req.params;
            await this.getOneChapterById(chapterID);
            const data = req.body;
            deleteInvalidPropertyInObject(data, ["_id"]);
            const updateChapterResult = await CourseModel.updateOne({"chapters._id" : chapterID},{
                $set : {
                    "chapters.$" : data
                }
            });
            if(updateChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError("به روزرسانی انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data: {
                    message : "به روزرسانی با موفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getOneChapterById(id){
        const chapter = await CourseModel.findOne({'chapters._id' : id}, {'chapters.$' : 1});
        if(!chapter) throw createHttpError.NotFound("فصلی یافت نشد");
        return chapter;
    }
}

module.exports = {
    ChapterController : new ChapterController(),
};