const { CourseController } = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.get("/list", CourseController.getListOfCourses) // get all courses
router.get("/:id", CourseController.getCourseById) // get a course
router.post("/add", uploadFile.single("image"), stringToArray("tags"), CourseController.addCourse) // create new course
router.patch("/update/:id", uploadFile.single("image"), stringToArray("tags"), CourseController.updateCourseById) // update course
//router.put() // create new episode
//router.patch() // update a course
//router.delete()  // delete a course

module.exports = {
    CourseRoutes : router,
};