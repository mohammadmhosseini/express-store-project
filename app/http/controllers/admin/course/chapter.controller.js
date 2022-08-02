const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { CourseModel } = require("../../../../models/course");
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
            const chapters = await CourseModel.findOne({ _id : courseId }, { chapters : 1, title: 1 });
            if(!chapters) throw createHttpError.NotFound("دوره ای یافت نشد");
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data: {
                    chapters
                }
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    ChapterController : new ChapterController(),
};