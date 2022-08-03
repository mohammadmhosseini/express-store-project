const mongoose = require("mongoose");
const { CommentSchema } = require("./public.schema");

const EpisodeSchema = new mongoose.Schema({
    title : { type: String, required: true},
    text : { type: String, required: true},
    type: { type: String, default : "free"}, // cash / free
    time : { type : String, required : true}
})

const ChapterSchema = new mongoose.Schema({
    title : { type: String, required: true},
    text : { type: String, default : ""},
    episodes : { type: [EpisodeSchema], default : []}
})

const CourseSchema = new mongoose.Schema({
    title : {type: String, required : true},
    short_text : {type: String, required : true},
    text : {type: String, required : true},
    image : {type: String, required : true},
    tags : {type: [String], default : []},
    category : {type: mongoose.Types.ObjectId, ref: "category", required : true},
    comments : {type: [CommentSchema], default : []},
    likes : {type: [mongoose.Types.ObjectId], default : []},
    dislikes : {type: [mongoose.Types.ObjectId], default : []},
    bookmarks : {type: [mongoose.Types.ObjectId], default : []},
    price : {type: Number, default : 0},
    discount : {type: Number, default : 0},
    type : {type: String, default : "free", required : true}, // cash / free / special students
    time : {type: String, default: "00:00:00"},
    status : {type: String, default: "NotStarted"}, // NotStarted / Holding / Completed
    teacher : {type: mongoose.Types.ObjectId, ref : "user"},
    chapters: { type: [ChapterSchema], default : []},
    students : {type: [mongoose.Types.ObjectId], default : [], ref : "user"}
},{
    toJSON : {
        virtuals : true
    }
});

CourseSchema.index({title : "text", short_text : "text", text : "text"});

module.exports = {
    CourseModel : mongoose.model("course", CourseSchema),
};