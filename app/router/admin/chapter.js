const { ChapterController } = require("../../http/controllers/admin/course/chapter.controller");
const router = require("express").Router();

router.put("/add", ChapterController.addChapter) // create new chapter
router.get("/list/:courseId", ChapterController.getChaptersOfCourse) // get chapters of course
router.patch("/remove/:chapterID", ChapterController.removeChapterById) // remove a chapter of course
router.patch("/update/:chapterID", ChapterController.updateChapterById) // update details of chapter

module.exports = {
    ChapterRoutes : router,
};