/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              reauired:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      example: 62e233bd02bfdcb40cb71803
 *                  title:
 *                      type: string
 *                      example: Chapter 1 basics of js
 *                  text:
 *                      type: string
 *                      example: text to describe chapter
 *          UpdateChapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: Chapter 1 basics of js
 *                  text:
 *                      type: string
 *                      example: text to describe chapter
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
 *  definitions:
 *      ListOfChapters:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          example: "best message for that action"
 *                      title:
 *                          type: string
 *                          example: "title of course"
 *                      chapters:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "title of course"
 *                                  title:
 *                                      type: string
 *                                  text:
 *                                      type: string
 *                                  episodes:
 *                                      type: array
 */

/**
 * @swagger
 * /admin/chapter/add:
 *  put:
 *      tags: [Chapter(Admin-Panel)]
 *      summary: create and save new chapter
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/AddChapter'
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/AddChapter'
 *      responses:
 *          201:
 *              description: create new chapter
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 * /admin/chapter/list/{courseId}:
 *  get:
 *      tags: [Chapter(Admin-Panel)]
 *      summary: get chapters of course
 *      parameters:
 *          -   in: path
 *              name: courseId
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: get chapters of course
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/ListOfChapters'
 */

/**
 * @swagger
 * /admin/chapter/remove/{chapterID}:
 *  patch:
 *      tags: [Chapter(Admin-Panel)]
 *      summary: remove a chapter of course
 *      parameters:
 *          -   in: path
 *              name: chapterID
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: get chapters of course
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 * /admin/chapter/update/{chapterID}:
 *  patch:
 *      tags: [Chapter(Admin-Panel)]
 *      summary: update details of chapter
 *      parameters:
 *          -   in: path
 *              name: chapterID
 *              type: string
 *              required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateChapter'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateChapter'
 *      responses:
 *          200:
 *              description: get chapters of course
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicDefinition'
 */