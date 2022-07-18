const {UserAuthController} = require("../../http/controllers/user/auth/auth.controller");
const router = require("express").Router();
/**
 * @swagger
 * tags:
 *  name: User-Authorization
 *  description: Auth-Section
 */
/**
 * @swagger
 * /user/get-otp:
 *  post:
 *      summary: Login user in system with phone number
 *      tags: [User-Authorization]
 *      description: create one time password(OTP)
 *      parameters:
 *      -   name: mobile
 *          description: fa-IR phone number
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorization
 *          500:
 *              description: Internal server error
 */
router.post("/get-otp", UserAuthController.getOtp);
/**
 * @swagger
 * /user/check-otp:
 *  post:
 *      tags: [User-Authorization]
 *      summary: check otp value in user controller
 *      description: check otp with code, mobile and expires date
 *      parameters:
 *      -   name: mobile
 *          description: fa-IR phone number
 *          in: formData
 *          required: true
 *          type: string
 *      -   name: code
 *          description: enter code form sms recived
 *          in: formData
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorization
 *          500:
 *              description: Internal server error
 */
router.post("/check-otp", UserAuthController.checkOtp);
/**
 * @swagger
 * /user/refresh-token:
 *  post:
 *      tags: [User-Authorization]
 *      summary: send refresh token for get new token and refresh token
 *      description: get new fresh token
 *      parameters:
 *      -   name: refreshToken
 *          in: formData
 *          type: string
 *          required: true
 *      responses:
 *          200:
 *              description: Success
 */
router.post("/refresh-token", UserAuthController.refreshToken);

module.exports = {
    UserAuthRoutes : router,
};