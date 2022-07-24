const { BlogRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const { vreifyAccessToken, checkRole } = require("../../http/middlewares/verifyAccessToken");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  -   name: Admin-Panel
 *      description: actions of admin ( add, edit, remove and anything to do)
 *  -   name: Category(Admin-Panel)
 *      description: all method and routes of category section
 *  -   name: Blog(Admin-Panel)
 *      description: all method and routes of blog section
 */
router.use("/category", CategoryRoutes);
router.use("/blog", BlogRoutes);

module.exports = {
    AdminRoutes : router,
};