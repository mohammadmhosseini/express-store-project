const { createProductSchema } = require("../../validators/admin/product.schema");
const Controller = require("../controller");
const path = require("path");
const { ProductModel } = require("../../../models/product");
const createError = require("http-errors");
const { deleteFileInPublic, listOfImagesFromRequest, setFeatures, copyObject, deleteInvalidPropertyInObject } = require("../../../utils/functions");
const { objectIdValiadator } = require("../../validators/public.validator");
const { StatusCodes } = require("http-status-codes");

const productBlackList = {
    BOOKMARKS : "bookmarks",
    LIKES : "likes",
    DISLIKES : "dislikes",
    COMMENTS : "comments",
    SUPPLIER : "supplier",
    COLORS : "colors",
    WIDTH : "width",
    WEIGHT : "weight",
    HEIGHT : "height",
    LENGTH : "length"
};
Object.freeze(productBlackList);

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
                statusCode: StatusCodes.CREATED,
                data: {
                    message: "محصول جدید باموفقیت ایجاد شد"
                }
            });
        } catch (error) {
            deleteFileInPublic(req?.body?.image)
            next(error)
        }
    }
    async editProduct(req, res, next){
        try {
            const { id } = req.params;
            const product = await this.findProduct(id);
            const data = copyObject(req.body);
            data.images = listOfImagesFromRequest(req?.files || [], req.body.fileUploadPath);
            data.features = setFeatures(req.body);
            let blackListFields = Object.values(productBlackList);
            deleteInvalidPropertyInObject(data, blackListFields);
            const result = await ProductModel.updateOne({_id : product._id}, {$set: data});
            if(result.modifiedCount == 0) throw createError.InternalServerError("خطای داخلی");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "به روزرسانی باموفقیت انجام شد"
                }
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    async removeProductById(req, res, next){
        try {
            const { id } = req.params;
            const product = await this.findProduct(id);
            const result = await ProductModel.deleteOne({ _id : product._id });
            if(result.deletedCount == 0) throw createError.InternalServerError("حذف محصول انجام نشد");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message: "محصول با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getAllProducts(req, res, next){
        try {
            const search = req?.query?.search || "";
            let products;
            if(search){
                products = await ProductModel.find({
                    $text: {
                        $search : new RegExp(search, "gi")
                    }
                });
            }else {
                products = await ProductModel.find({});
            }
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
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
                statusCode: StatusCodes.OK,
                data: {
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