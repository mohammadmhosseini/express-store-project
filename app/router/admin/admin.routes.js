const { BlogRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const { ChapterRoutes } = require("./chapter");
const { CourseRoutes } = require("./course");
const { ProductRoutes } = require("./product");
const router = require("express").Router();

router.use("/category", CategoryRoutes);
router.use("/blog", BlogRoutes);
router.use("/product", ProductRoutes);
router.use("/course", CourseRoutes);
router.use("/chapter", ChapterRoutes);

module.exports = {
    AdminRoutes : router,
};