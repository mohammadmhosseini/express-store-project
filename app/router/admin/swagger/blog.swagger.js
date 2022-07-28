/**
 * @swagger
 * components:
 *  schemas:
 *      Blog:
 *          type: object
 *          required:
 *              -   title
 *              -   text
 *              -   short_text
 *              -   tags
 *              -   category
 *              -   image
 *          properties:
 *              title:
 *                  type: string
 *                  description: the title of blog
 *              text:
 *                  type: string
 *                  description: the text of blog
 *              short_text:
 *                  type: string
 *                  description: the summary of text of blog
 *              tags:
 *                  type: string
 *                  description: the tags of blog example(tag1#tag_2#tag-3)
 *              category:
 *                  type: string
 *                  description: the id of category for foreignField in blog
 *              image:
 *                  type: file
 *                  description: the index image of blog
 */
/**
 * @swagger
 * /admin/blog:
 *  get:
 *      tags: [Blog(Admin-Panel)]
 *      summary: get list of blogs
 *      responses:
 *          200:
 *              description: success - get array of blogs
 */

/**
 * @swagger
 * /admin/blog/{id}:
 *  get:
 *      tags: [Blog(Admin-Panel)]
 *      summary: get blog by Id and populate fields
 *      parameters:
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/blog/create:
 *  post:
 *      tags: [Blog(Admin-Panel)]
 *      summary: create blog
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Blog'
 *      responses:
 *          201:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 * /admin/blog/edit/{id}:
 *  patch:
 *      tags: [Blog(Admin-Panel)]
 *      summary: update blog by id
 *      consumes:
 *      -   multipart/form-data
 *      parameters:
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
 *      -   name: title
 *          in: formData
 *          type: string
 *      -   name: text
 *          in: formData
 *          type: string
 *      -   name: short_text
 *          in: formData
 *          type: string
 *      -   name: tags
 *          in: formData
 *          type: string
 *          example: tag1#tag2#tag3_foo#foo-bar || string || undefind
 *      -   name: category
 *          in: formData
 *          type: string
 *      -   name: image
 *          in: formData
 *          type: file
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
 * /admin/blog/{id}:
 *  delete:
 *      tags: [Blog(Admin-Panel)]
 *      summary: delete bloge by Id
 *      parameters:
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicDefinition'
 */