const {UserAuthController} = require("../../http/controllers/user/auth/auth.controller");
const router = require("express").Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      GetOTP:
 *          type: object
 *          required:
 *              -   mobile
 *          properties:
 *              mobile:
 *                  type: string
 *                  description: the user mobile for signup / signin
 *      CheckOTP:
 *          type: object
 *          required:
 *              -   mobile
 *              -   code
 *          properties:
 *              mobile:
 *                  type: string
 *                  description: the user mobile for signup / signin
 *              code:
 *                  type: string
 *                  description: recived code from getOtp
 *      RefreshToken:
 *          type: object
 *          required:
 *              -   refreshToken
 *          properties:
 *              refreshToken:
 *                  type: string
 *                  description: enter refreshToken for get fresh token and refresh token
 */
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
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/GetOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/GetOTP'
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
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
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
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RefreshToken'
 *      responses:
 *          200:
 *              description: Success
 */
router.post("/refresh-token", UserAuthController.refreshToken);

module.exports = {
    UserAuthRoutes : router,
};