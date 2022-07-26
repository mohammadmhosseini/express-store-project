const { createProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");
const { ProductModel } = require("../../../models/product");
const createError = require("http-errors");
const { deleteFileInPublic, listOfImagesFromRequest, setFeatures } = require("../../../utils/functions");
const { objectIdValiadator } = require("../../validators/public.validator");
const { StatusCodes } = require("http-status-codes");

class ProductController extends Controller{
    async addProduct(req, res, next){
        try {
            const images = listOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
            const productBody = await createProductSchema.validateAsync(req.body);
            const { title, text, short_text, category, tags, price, discount, count, type } = productBody;
            const supplier = req.user._id;
            let features = setFeatures(req.body);
            const result = await ProductModel.create({
                supplier,
                title,
                text,
                short_text,
                category,
                tags,
                images,
                features,
                price,
                discount,
                count,
                type
            })
            if(!result) throw createError.InternalServerError("محصول جدید ایجاد نشد");
            return res.status(StatusCodes.CREATED).json({
                data: {
                    statusCode: StatusCodes.CREATED,
                    message: "محصول جدید باموفقیت ایجاد شد"
                }
            });
        } catch (error) {
            deleteFileInPublic(req?.body?.image)
            next(error)
        }
    }
    async editProduct(req, res, next){

    }
    async removeProductById(req, res, next){
        try {
            const { id } = req.params;
            const product = await this.findProduct(id);
            const result = await ProductModel.deleteOne({ _id : product._id });
            if(result.deletedCount == 0) throw createError.InternalServerError("حذف محصول انجام نشد");
            return res.status(StatusCodes.OK).json({
                data: {
                    statusCode: StatusCodes.OK,
                    message: "محصول با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getAllProducts(req, res, next){
        try {
            const products = await ProductModel.find({});
            return res.status(StatusCodes.OK).json({
                data: {
                    statusCode: StatusCodes.OK,
                    products
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getProductById(req, res, next){
        try {
            const { id } = req.params;
            const product = await this.findProduct(id);
            return res. status(StatusCodes.OK).json({
                data: {
                    statusCode: StatusCodes.OK,
                    product
                }
            });
        } catch (error) {
            next(error);
        }
    }
    async findProduct(productId){
        const { id } = await objectIdValiadator.validateAsync({ id : productId });
        const product = await ProductModel.findById(id);
        if(!product) throw createError.NotFound("محصولی یافت نشد");
        return product;
    }
};

module.exports = {
    ProductController : new ProductController(),
};