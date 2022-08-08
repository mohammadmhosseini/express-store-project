const { EpisodeController } = require("../../http/controllers/admin/course/episode.controller");
const { uploadVideo } = require("../../utils/multer");
const router = require("express").Router();

router.post("/add", uploadVideo.single("video"), EpisodeController.addEpisode);
router.delete("/remove/:episodeID", EpisodeController.removeEpisode);
router.patch("/update/:episodeID", uploadVideo.single("video"), EpisodeController.editEpisode);

module.exports = {
    EpisodeRoutes : router
}