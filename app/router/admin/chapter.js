const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");
const router = require("express").Router();

router.put("/add", ChapterController.addChapter) // create new chapter
router.get("/list/:courseId", ChapterController.getChaptersOfCourse) // get chapters of course

module.exports = {
    ChapterRoutes : router,
};