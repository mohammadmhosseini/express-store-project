const Controller = require("../../controller");
const { createEpisodeSchema } = require("../../../validators/admin/course.schema");

class EpisodeController extends Controller{
    async addEpisode(req, res, next){
        try {
            const { title, text, type, time, courseID, chapterID} = await createEpisodeSchema.validateAsync(req.body);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    EpisodeController : new EpisodeController(),
};