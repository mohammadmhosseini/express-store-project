const mongoose = require("mongoose");
const { CommentSchema } = require("./public.schema");

const Schema = new mongoose.Schema({
    title : {type: String, required : true},
    short_text : {type: String, required : true},
    text : {type: String, required : true},
    images : {type: [String], required : true},
    tags : {type: [String], default : []},
    category : {type: mongoose.Types.ObjectId, ref: "category", required : true},
    comments : {type: [CommentSchema], default : []},
    likes : {type: [mongoose.Types.ObjectId], default : []},
    dislikes : {type: [mongoose.Types.ObjectId], default : []},
    bookmarks : {type: [mongoose.Types.ObjectId], default : []},
    price : {type: Number, default : 0},
    discount : {type: Number, default : 0},
    count : {type: Number},
    type : {type: String, required : true}, // virtual / real
    format : {type: String},
    supplier : {type: mongoose.Types.ObjectId, ref : "user", required : true},
    features : {type: Object, default : {
        length : "",
        height : "",
        width : "",
        weight : "",
        colors : [],
        model : [],
        madein : ""
    }},
},{
    toJSON:{
        virtuals: true
    }
});

Schema.index({ title : "text", text : "text", short_text : "text"});
Schema.virtual("imagesURL").get(function() {
    return this.images.map(image => `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${image}`);
})

module.exports = {
    ProductModel : mongoose.model("product", Schema),
};