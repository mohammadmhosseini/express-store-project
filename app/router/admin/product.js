const { ProductController } = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

router.get("/list", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.delete("/remove/:id", ProductController.removeProductById);
router.post("/add", uploadFile.array("images", 10), stringToArray("tags", "colors"), ProductController.addProduct);
router.patch("/edit/:id", uploadFile.array("images", 10), stringToArray("tags", "colors"), ProductController.editProduct);

module.exports = {
    ProductRoutes : router,
};