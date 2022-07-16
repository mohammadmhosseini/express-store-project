const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title : {type : String},
    text : {type : String},
    images : {type : [String], required : true},
    type : {type: String, default : "main"}
});

module.exports = {
    SliderModel : mongoose.model("slider", Schema),
};