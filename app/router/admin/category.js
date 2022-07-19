const { CategoryController } = require("../../http/controllers/admin/category.controller");
const router = require("express").Router();

/**
 * @swagger
 * /admin/category/add:
 *  post:
 *      tags: [Category(Admin-Panel)]
 *      summary: add new category
 *      parameters:
 *      -   name: title
 *          in: formData
 *          type: string
 *          required: true
 *      -   name: parent
 *          in: formData
 *          type: string
 *          required: false
 *      responses:
 *          201:
 *              description: success
 */
router.post("/add", CategoryController.addCategory);
/**
 * @swagger
 * /admin/category/all:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: get all categories
 *      responses:
 *          200:
 *              description: success
 */
router.get("/all", CategoryController.getAllCategories);
/**
 * @swagger
 * /admin/category/list-of-all:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: get all categories without populate
 *      responses:
 *          200:
 *              description: success
 */
router.get("/list-of-all", CategoryController.getAllCategoriesWithoutPopulate);
/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: get all parent categories or heads
 *      responses:
 *          200:
 *              description: success
 */
router.get("/parents", CategoryController.getAllParents);
/**
 * @swagger
 * /admin/category/childs/{parent}:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: get chids of a parent category
 *      parameters:
 *      -   name: parent
 *          in: path
 *          type: string
 *          required: true
 *      responses:
 *          200:
 *              description: success
 */
router.get("/childs/:parent", CategoryController.getChildOfParents);
/**
 * @swagger
 * /admin/category/{id}:
 *  get:
 *      tags: [Category(Admin-Panel)]
 *      summary: get category by Id
 *      parameters:
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
 *      responses:
 *          200:
 *              description: success
 */
router.get("/:id", CategoryController.getCategoryById);
/**
 * @swagger
 * /admin/category/remove/{id}:
 *  delete:
 *      tags: [Category(Admin-Panel)]
 *      summary: remove category by Id
 *      parameters:
 *      -   name: id
 *          in: path
 *          type: string
 *          required: true
 *      responses:
 *          200:
 *              description: success
 */
 router.delete("/remove/:id", CategoryController.removeCategory);
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
 *      -   name: title
 *          in: formData
 *          type: string
 *          required: true
 *      responses:
 *          200:
 *              description: success
 *          500:
 *              description: InternalServerError
 */
router.patch("/update/:id", CategoryController.editCategoryTitle);
module.exports = {
    CategoryRoutes : router,
};