const { CategoryController } = require("../../http/controllers/admin/category.controller");
const router = require("express").Router();

router.post("/add", CategoryController.addCategory);
router.get("/all", CategoryController.getAllCategories);
router.get("/list-of-all", CategoryController.getAllCategoriesWithoutPopulate);
router.get("/parents", CategoryController.getAllParents);
router.get("/childs/:parent", CategoryController.getChildOfParents);
router.get("/:id", CategoryController.getCategoryById);
router.delete("/remove/:id", CategoryController.removeCategory);
router.patch("/update/:id", CategoryController.editCategoryTitle);

module.exports = {
    CategoryRoutes : router,
};