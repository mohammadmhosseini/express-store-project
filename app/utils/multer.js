const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createError = require("http-errors");

function createUploadPath(req){
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const imageDirectory = path.join(__dirname, "..", "..", "public", "uploads", "blogs", "images", year, month, day);
    req.body.fileUploadPath = path.join("uploads", "blogs", "images", year, month, day);
    fs.mkdirSync(imageDirectory, {recursive : true});
    return imageDirectory;
    /* return path.join("public", "uploads", "blogs", "images", year, month, day); */
}

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        if(file?.originalname){
            const filePath = createUploadPath(req);
            return cb(null, filePath);
        }
        cb(null, null);
    },
    filename : (req, file, cb) => {
        if(file?.originalname){
            const ext = path.extname(file.originalname);
            const fileName = String(new Date().getTime() + ext);
            req.body.filename = fileName;
            return cb(null, fileName);
        }
        cb(null, null);
    }
});

function fileFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimtypes = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    if(mimtypes.includes(ext)) return cb(null, true);
    return cb(createError.BadRequest("فرمت تصویر ارسال شده نادرست است"));
}

const maxSize = 1 * 1000 * 1000;
const uploadFile = multer({storage, fileFilter, limits: {fileSize : maxSize}});

module.exports = {
    uploadFile,
};