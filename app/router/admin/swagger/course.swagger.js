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
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      courses:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  title:
 *                                      type: string
 *                                      example: "title of course"
 *                                  text:
 *                                      type: string
 *                                      example: "text of course"
 *                                  short_text:
 *                                      type: string
 *                                      example: "short_text of course"
 *                                  category:
 *                                      type: string
 *                                      example: "category of course"
 *                                  tags:
 *                                      type: array
 *                                      example: ["item1", "item2", ...]
 *                                  status:
 *                                      type: string
 *                                      example: "status of course"
 *                                  time:
 *                                      type: string
 *                                      example: "00:00:00"
 *                                  type:
 *                                      type: string
 *                                      example: "Completed | Holding | NotStarted"
 *                                  price:
 *                                      type: integer
 *                                      example: 25000
 *                                  discount:
 *                                      type: integer
 *                                      example: 20
 */

/**
 * @swagger
 *  definitions:
 *      publicDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 20X
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: "best message for that action"
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/ListOfCourses'
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
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicDefinition'
 */

