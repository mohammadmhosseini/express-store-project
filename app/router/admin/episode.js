const { EpisodeController } = require("../../http/controllers/admin/course/episode.controller");
const router = require("express").Router();

router.post("/add", EpisodeController.addEpisode);

module.exports = {
    EpisodeRoutes : router
}