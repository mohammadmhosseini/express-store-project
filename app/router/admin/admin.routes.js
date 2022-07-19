const { CategoryRoutes } = require("./category");
const router = require("express").Router();

/**
 * @swagger
 * tags:
 *  -   name: Admin-Panel
 *      description: actions of admin ( add, edit, remove and anything to do)
 *  -   name: Category(Admin-Panel)
 *      description: all method and routes of category section
 */
router.use("/category", CategoryRoutes);

module.exports = {
    AdminRoutes : router,
};