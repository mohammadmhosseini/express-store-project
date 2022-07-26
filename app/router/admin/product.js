const { ProductController } = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

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
 * /admin/product/list:
 *  get:
 *      tags: [Product(Admin-Panel)]
 *      summary: get all products
 *      responses:
 *          200:
 *              description: success
 */
router.get("/list", ProductController.getAllProducts);

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
router.get("/:id", ProductController.getProductById);

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
 */
router.delete("/remove/:id", ProductController.removeProductById);

/**
 * @swagger
 * /admin/product/add:
 *  post:
 *      tags: [Product(Admin-Panel)]
 *      summary: add new category
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          201:
 *              description: create new product
 */
router.post("/add", uploadFile.array("images", 10), stringToArray("tags", "colors"), ProductController.addProduct);
/* router.patch();
router.delete(); */

module.exports = {
    ProductRoutes : router,
};