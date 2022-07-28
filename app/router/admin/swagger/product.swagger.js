/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: array
 *              items:
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray                
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   orange
 *                      -   purple
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type : object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   category
 *                  -   tags
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product 
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of product 
 *                  text:
 *                      type: string
 *                      description: the text of product 
 *                  category:
 *                      type: string
 *                      description: the category of product 
 *                      example: 62d5474a92edd949cc880f7d
 *                  tags:
 *                      type: array
 *                      description: the tags of product 
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                  count:
 *                      type: string
 *                      description: the counts of product
 *                  width:
 *                      type: string
 *                      description: the width of product
 *                  height:
 *                      type: string
 *                      description: the height of product
 *                  weight:
 *                      type: string
 *                      description: the weight of product
 *                  length:
 *                      type: string
 *                      description: the length of product
 *                  type:
 *                      type: string
 *                      description: the type of product
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          EditProduct:
 *              type : object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product 
 *                  short_text:
 *                      type: string
 *                      description: the summary of text of product 
 *                  text:
 *                      type: string
 *                      description: the text of product 
 *                  category:
 *                      type: string
 *                      description: the category of product 
 *                      example: 62d5474a92edd949cc880f7d
 *                  tags:
 *                      type: array
 *                      description: the tags of product 
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                  count:
 *                      type: string
 *                      description: the counts of product
 *                  width:
 *                      type: string
 *                      description: the width of product
 *                      example: 0
 *                  height:
 *                      type: string
 *                      description: the height of product
 *                      example: 0
 *                  weight:
 *                      type: string
 *                      description: the weight of product
 *                      example: 0
 *                  length:
 *                      type: string
 *                      description: the length of product
 *                      example: 0
 *                  type:
 *                      type: string
 *                      description: the type of product
 *                      example: virtual - physical
 *                  colors:
 *                      $ref: '#/components/schemas/Color'
 */

/**
 * @swagger
 * /admin/product/list:
 *  get:
 *      tags: [Product(Admin-Panel)]
 *      summary: get all products
 *      parameters:
 *          -   name: search
 *              in: query
 *              type: string
 *              description: text for search in title, text, short_text of products
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/product/{id}:
 *  get:
 *      tags: [Product(Admin-Panel)]
 *      summary: get one product by ID
 *      parameters:
 *      -   in: path
 *          name: id
 *          type: string
 *          description: ObjectId of prosuct
 *          required: true
 *      responses:
 *          200:
 *              description: success
 */

/**
 * @swagger
 * /admin/product/remove/{id}:
 *  delete:
 *      tags: [Product(Admin-Panel)]
 *      summary: remove one product by ID
 *      parameters:
 *      -   in: path
 *          name: id
 *          type: string
 *          description: ObjectId of prosuct
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
 * /admin/product/add:
 *  post:
 *      tags: [Product(Admin-Panel)]
 *      summary: add new product
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          201:
 *              description: create new product
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 * /admin/product/edit/{id}:
 *  patch:
 *      tags: [Product(Admin-Panel)]
 *      summary: update priduct
 *      parameters:
 *          -   name: id
 *              in: path
 *              type: string
 *              required: true
 *              description: ObjectId of product for update
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/EditProduct'
 *      responses:
 *          200:
 *              description: update product
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/definitions/publicDefinition'
 */