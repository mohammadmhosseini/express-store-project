const { BlogRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const { CourseRoutes } = require("./course");
const { ProductRoutes } = require("./product");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  -   name: Admin-Panel
 *      description: actions of admin ( add, edit, remove and anything to do)
 *  -   name: Course(Admin-Panel)
 *      description: mangement course section like crud operation on courses
 *  -   name: Product(Admin-Panel)
 *      description: management products routes
 *  -   name: Category(Admin-Panel)
 *      description: all method and routes of category section
 *  -   name: Blog(Admin-Panel)
 *      description: all method and routes of blog section
 */
router.use("/category", CategoryRoutes);
router.use("/blog", BlogRoutes);
router.use("/product", ProductRoutes);
router.use("/course", CourseRoutes);

module.exports = {
    AdminRoutes : router,
};