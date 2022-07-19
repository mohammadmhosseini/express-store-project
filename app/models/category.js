const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type : String, required : true},
    parent : {type : mongoose.Types.ObjectId, ref : "category" ,default : undefined}
},
{   
    id : false,
    /* versionKey : false, */
    toJSON : {
        virtuals : true
    }
});
Schema.virtual("childs", {
    ref : "category",
    localField : "_id",
    foreignField : "parent",
});

function autoPopulate(next){
    this.populate([{ path : "childs", select : { __v : 0, id : 0} }]);
    next();
}
Schema.pre("findOne", autoPopulate).pre("find", autoPopulate);

module.exports = {
    CategoryModel : mongoose.model("category", Schema),
};