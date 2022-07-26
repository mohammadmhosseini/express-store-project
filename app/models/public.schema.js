const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user: { type : mongoose.Types.ObjectId, required : true },
    text: { type: String, required : true},
    createdAt: { type : Date, default: new Date()},
    parent: { type : mongoose.Types.ObjectId, ref: "comment"}
});

module.exports = {
    CommentSchema,
};