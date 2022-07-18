const homeController = require("../../http/controllers/api/home.controller");
const { vreifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: Index Page Api's
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: Index of routes
 *      tags: [IndexPage]
 *      description: get all needed data for index page
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          example: Bearer YourToken...
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: not found
 */
router.get("/", vreifyAccessToken, homeController.indexPage);

module.exports = {
    HomeRoutes : router,
};