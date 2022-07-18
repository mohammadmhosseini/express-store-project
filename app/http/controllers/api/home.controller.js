const Controller = require("../controller");

module.exports = new class HomeController extends Controller{
    async indexPage(req, res, next){
        return res.status(200).send("<h1>Web Store Application</h1>");
    }
}