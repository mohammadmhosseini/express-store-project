module.exports = class Application{
    #express = require("express");
    #app = this.#express();
    constructor(PORT, DB_URL){
        this.connectToMongoDB(DB_URL);
        this.createServer(PORT);
        this.configApplication();
        this.createRoutes();
        this.errorHandling();
    }
    configApplication(){
        const path = require("path")
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({ extended : true }));
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
    }
    connectToMongoDB(DB_URL){
        const mongoose = require("mongoose");
        mongoose.connect(DB_URL, (error) => {
            if(error) return console.log("Failed to connect to DB!!!");
            return console.log("Connect to MongoDB successfully...");
        })
    }
    createServer(PORT){
        const http = require("http");
        const server = http.createServer(this.#app);
        server.listen(PORT, () => {
            console.log("Server run > on http://localhost:" + PORT);
        });
    }
    createRoutes(){
        const { AllRoutes } = require("./router/router");
        this.#app.use(AllRoutes);
    }
    errorHandling(){
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status : 404,
                success : false,
                message : "مسیر مورد نظر یافت نشد"
            })
        });
        this.#app.use((error, req, res, next) => {
            const status = error?.static || 500;
            const message = error?.message || "InternalServerError";
            return res.status(status).json({
                status,
                success: false,
                message
            })
        });
    }
}