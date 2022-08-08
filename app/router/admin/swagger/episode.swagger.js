/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   courseID
 *                  -   chapterID
 *                  -   title
 *                  -   text
 *                  -   type
 *                  -   video
 *              properties:
 *                  courseID:
 *                      type: string
 *                      example: 62e233bd02bfdcb40cb71803
 *                  chapterID:
 *                      type: string
 *                      example: 62e27d22dff85528deeb2430
 *                  title:
 *                      type: string
 *                      example: variables
 *                  text:
 *                      type: string
 *                      example: in this episode we describe variables and how to define those
 *                  type:
 *                      type: string
 *                      enum:
 *                          - unlock
 *                          - lock
 *                  video:
 *                      type: string
 *                      format: binary
 *                      description: the file of viedo
 *          UpdateEpisode:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: variables
 *                  text:
 *                      type: string
 *                      example: in this episode we describe variables and how to define those
 *                  type:
 *                      type: string
 *                      enum:
 *                          - unlock
 *                          - lock
 *                  video:
 *                      type: string
 *                      format: binary
 *                      description: the file of viedo
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
 * /admin/episode/add:
 *  post:
 *      tags: [Episode(Admin-Panel)]
 *      summary: create new episode of cahpter
 *      requestBody:
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/AddEpisode'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 * /admin/episode/remove/{episodeID}:
 *  delete:
 *      tags: [Episode(Admin-Panel)]
 *      summary: remove episode of chapter
 *      parameters:
 *          -   in: path
 *              name: episodeID
 *              required: true
 *              type: string
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicDefinition'
 */
/**
 * @swagger
 * /admin/episode/update/{episodeID}:
 *  patch:
 *      tags: [Episode(Admin-Panel)]
 *      summary: edit episode of chapter
 *      parameters:
 *          -   in: path
 *              name: episodeID
 *              required: true
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateEpisode'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicDefinition'
 */