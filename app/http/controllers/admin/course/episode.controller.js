const Controller = require("../../controller");
const { createEpisodeSchema } = require("../../../validators/admin/course.schema");
const path = require("path");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { getTime, deleteInvalidPropertyInObject, copyObject } = require("../../../../utils/functions");
const { CourseModel } = require("../../../../models/course");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { objectIdValiadator } = require("../../../validators/public.validator");
const {Types} = require("mongoose");
const fs = require("fs");

class EpisodeController extends Controller{
    async addEpisode(req, res, next){
        try {
            const { title, text, type, courseID, chapterID, filename, fileUploadPath } = await createEpisodeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, "/");
            const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
            const seconds = await getVideoDurationInSeconds(videoURL);
            const time = getTime(seconds);
            const episode = { 
                title, 
                text, 
                type, 
                time, 
                videoAddress
            };
            const createEpisodeResult = await CourseModel.updateOne({
                _id : courseID,
                "chapters._id" : chapterID
            },
            {
                $push: {
                    "chapters.$.episodes" : episode
                }
            });
            if(createEpisodeResult.modifiedCount == 0) throw createError.InternalServerError("افزودن اپیزود انجام نشد");
            return res.status(StatusCodes.CREATED).json({
                statusCode : StatusCodes.CREATED,
                data: {
                    message: "افزودن اپیزود با موفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async removeEpisode(req, res, next){
        try {
            const {id : episodeID} = await objectIdValiadator.validateAsync({id : req.params.episodeID});
            const episode = await this.getOneEpisode(episodeID)
            const removeEpisodeResult = await CourseModel.updateOne({
                "chapters.episodes._id" : episodeID
            },
            {
                $pull: {
                    "chapters.$.episodes" : {
                        _id : episodeID
                    }
                }
            });
            if(removeEpisodeResult.modifiedCount == 0) throw createError.InternalServerError("حذف اپیزود انجام نشد");
            const episodeVideoAddress = path.join(__dirname, "..", "..", "..", "..", "..", "public", episode.videoAddress);
            if(fs.existsSync(episodeVideoAddress)) fs.unlinkSync(episodeVideoAddress);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "حذف اپیزود باموفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async editEpisode(req, res, next){
        try {
            const {id : episodeID} = await objectIdValiadator.validateAsync({id : req.params.episodeID});
            const episode = await this.getOneEpisode(episodeID);
            const { filename, fileUploadPath } = req.body;
            let blackListFields = ["_id"];
            if(filename && fileUploadPath){
                req.body.videoAddress = path.join(fileUploadPath, filename).replace(/\\/g, "/");
                const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`;
                const seconds = await getVideoDurationInSeconds(videoURL);
                req.body.time = getTime(seconds);
                blackListFields.push("filename");
                blackListFields.push("fileUploadPath");
            }else {
                blackListFields.push("time");
                blackListFields.push("videoAddress");
            }
            const data = {...req.body};
            deleteInvalidPropertyInObject(data, blackListFields);
            const updatedEpisode = {
                ...episode,
                ...data
            }
            delete updatedEpisode._id;
            const updateResult = await CourseModel.updateOne({
                "chapters.episodes._id" : episodeID
            },
            {
                $set: {
                    "chapters.$.episodes" : updatedEpisode
                }
            });
            if(updateResult.modifiedCount == 0) throw createError.InternalServerError("ویرایش اپیزود انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "ویرایش اپیزود باموفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getOneEpisode(id){
        const course = await CourseModel.findOne({"chapters.episodes._id" : id}, {
            "chapters.$" : 1
        });
        const episode = course.chapters[0].episodes.find(item => item._id == id);
        if(!course) throw createError.NotFound("دوره ای یافت نشد");
        if(!episode) throw createError.NotFound("اپیزودی ای یافت نشد");
        return copyObject(episode);
    }
}

module.exports = {
    EpisodeController : new EpisodeController(),
};