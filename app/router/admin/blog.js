const { BlogController } = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.get("/", BlogController.getListOfBlogs);
router.get("/:id", BlogController.getOneBlogById);
router.post("/create", uploadFile.single("image"), stringToArray("tags"), BlogController.createBlog);
router.patch("/edit/:id", uploadFile.single("image"), stringToArray("tags"), BlogController.updateBlogById);
router.delete("/:id", BlogController.removeBlogById)

module.exports = {
    BlogRoutes : router,
};