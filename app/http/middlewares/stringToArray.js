// tag1#tag2#tag3_foo#foo_bar
// string                       =>  [...values] || [value] || []
// undefind || null
const stringToArray = function(field){
    return function(req, res, next){
        if(req.body[field]){
            if(typeof req.body[field] == "string"){
                if(req.body[field].indexOf("#") >= 0){
                    req.body[field] = req.body[field].split("#").map(item => item.trim());
                }else{
                    req.body[field] = Array(req.body[field]);
                }
            }
            else if(req.body[field].constructor == "Array"){
                req.body[field] = req.body[field].map(item => item.trim());
            }
        }else {
            req.body[field] = [];
        }
        next()
    }
}

module.exports = {
    stringToArray,
};