/**
 * @swagger
 * components:
 *  schemas:
 *      UpsertCategory:
 *          type: object
 *          required:
 *              -   title
 *          properties:
 *              title:
 *                  type: string
 *                  description: the title of category
 *              parent:
 *                  type: string
 *                  description: the parent of category
 */
/**
 * @swagger
 * /admin/category/add:
 *  post:
 *      tags: [Category(Admin-Panel)]
 *      summary: add new category
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM1MzE2NDY4NyIsImlhdCI6MTY1ODY0NDUzMSwiZXhwIjoxNjU4NzMwOTMxfQ.VYf5dncdWnT77Rh0s7M4IF4bwCWoW4TlhWeuVNp1KKM
 *          type: string
 *          required: true
 *          example: Bearer Your token...
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/UpsertCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpsertCategory'
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
 * /admin/category/all:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: get all categories
 *      parameters:
 *      -   name: access-token
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM1MzE2NDY4NyIsImlhdCI6MTY1ODY0NDUzMSwiZXhwIjoxNjU4NzMwOTMxfQ.VYf5dncdWnT77Rh0s7M4IF4bwCWoW4TlhWeuVNp1KKM
 *          in: header
 *          type: string
 *          required: true
 *          example: Bearer Your token...
 *      responses:
 *          200:
 *              description: success
 */
/**
 * @swagger
 * /admin/category/list-of-all:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: get all categories without populate
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM1MzE2NDY4NyIsImlhdCI6MTY1ODY0NDUzMSwiZXhwIjoxNjU4NzMwOTMxfQ.VYf5dncdWnT77Rh0s7M4IF4bwCWoW4TlhWeuVNp1KKM
 *          type: string
 *          required: true
 *          example: Bearer Your token...
 *      responses:
 *          200:
 *              description: success
 */
/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: get all parent categories or heads
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM1MzE2NDY4NyIsImlhdCI6MTY1ODY0NDUzMSwiZXhwIjoxNjU4NzMwOTMxfQ.VYf5dncdWnT77Rh0s7M4IF4bwCWoW4TlhWeuVNp1KKM
 *          required: true
 *          example: Bearer Your token...
 *      responses:
 *          200:
 *              description: success
 */
/**
 * @swagger
 * /admin/category/childs/{parent}:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: get chids of a parent category
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM1MzE2NDY4NyIsImlhdCI6MTY1ODY0NDUzMSwiZXhwIjoxNjU4NzMwOTMxfQ.VYf5dncdWnT77Rh0s7M4IF4bwCWoW4TlhWeuVNp1KKM
 *          required: true
 *          example: Bearer Your token...
 *      -   name: parent
 *          in: path
 *          type: string
 *          required: true
 *      responses:
 *          200:
 *              description: success
 */
/**
 * @swagger
 * /admin/category/{id}:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: get category by Id
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM1MzE2NDY4NyIsImlhdCI6MTY1ODY0NDUzMSwiZXhwIjoxNjU4NzMwOTMxfQ.VYf5dncdWnT77Rh0s7M4IF4bwCWoW4TlhWeuVNp1KKM
 *          required: true
 *          example: Bearer Your token...
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
 * /admin/category/remove/{id}:
 *  delete:
 *      tags: [Category(Admin-Panel)]
 *      summary: remove category by Id
 *      parameters:
 *      -   name: access-token
 *          in: header
 *          type: string
 *          value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM1MzE2NDY4NyIsImlhdCI6MTY1ODY0NDUzMSwiZXhwIjoxNjU4NzMwOTMxfQ.VYf5dncdWnT77Rh0s7M4IF4bwCWoW4TlhWeuVNp1KKM
 *          required: true
 *          example: Bearer Your token...
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
/**
 * @swagger
 * /admin/category/update/{id}:
 *  patch:
 *      tags: [Category(Admin-Panel)]
 *      summary: edit or update category title with Id
 *      parameters:
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/UpsertCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpsertCategory'
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicDefinition'
 *          500:
 *              description: InternalServerError
 */