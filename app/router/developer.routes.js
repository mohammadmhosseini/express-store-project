const router = require("express").Router();
const bcrypt = require("bcrypt");
const { randomNumberGen } = require("../utils/functions");

/**
 * @swagger
 * tags:
 *  name: Developer-Routes
 *  description: developer utils
 */
/**
 * @swagger
 * /developer/hash-password/{password}:
 *  get:
 *      tags: [Developer-Routes]
 *      summary: hash data with bcrypt
 *      parameters:
 *      -   name: password
 *          in: path
 *          type: string
 *          required: true
 *      responses:
 *          200:
 *              description: Success
 */
router.get("/hash-password/:password", (req, res, next) => {
    const {password} = req.params;
    const salt = bcrypt.genSaltSync(10);
    return res.send(bcrypt.hashSync(password, salt));
})
/**
 * @swagger
 * /developer/random-number:
 *  get:
 *      tags: [Developer-Routes]
 *      summary: generate random number
 *      responses:
 *          200:
 *              description: Success
 */
router.get("/random-number", (req, res, next) => {
    return res.send(randomNumberGen().toString());
})

module.exports = {
    DeveloperRoutes : router,
};