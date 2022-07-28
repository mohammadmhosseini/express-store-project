/**
 * @swagger
 *  components:
 *      schemas:
 *          Type:
 *              type: string
 *              enum:
 *                  -   cash
 *                  -   free
 *                  -   special
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          InsertCourse:
 *              type : object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   image
 *                  -   category
 *                  -   tags
 *                  -   price
 *                  -   discount
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                      example: عنوان دوره
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of course 
 *                      example: خلاصه توضیحات
 *                  text:
 *                      type: string
 *                      description: the text of course
 *                      example: توضیحات تکمیلی دوره
 *                  category:
 *                      type: string
 *                      description: the category of course
 *                      example: 62d5474a92edd949cc880f7d
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  image:
 *                      type: string
 *                      format: binary
 *                  price:
 *                      type: string
 *                      description: the price of course
 *                      example: 1000
 *                  discount:
 *                      type: string
 *                      description: the discount of course
 *                      example: 100
 *                  type:
 *                      $ref: '#/components/schemas/Type'
 */

/**
 * @swagger
 * /admin/course/list:
 *  get:
 *      tags: [Course(Admin-Panel)]
 *      summary: get all of courses
 *      parameters:
 *          -   in: query
 *              name: search
 *              type: string
 *              description: text for search in title, text, short_text of courses
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/course/{id}:
 *  get:
 *      tags: [Course(Admin-Panel)]
 *      summary: find a course by id
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *              description: ObjectId for find a course
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/course/add:
 *  post:
 *      tags: [Course(Admin-Panel)]
 *      summary: add new course and save
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/InsertCourse'
 *      responses:
 *          201:
 *              description: create new course
 */