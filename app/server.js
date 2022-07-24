module.exports = class Application{
    #express = require("express");
    #app = this.#express();
    constructor(PORT, DB_URL){
        this.connectToMongoDB(DB_URL);
        this.initRedis();
        this.createServer(PORT);
        this.configApplication();
        this.createRoutes();
        this.errorHandling();
    }
    configApplication(){
        const path = require("path");
        const morgan = require("morgan");
        const swaggerUI = require("swagger-ui-express");
        const swaggerJsDoc = require("swagger-jsdoc");
        const cors = require("cors");
        this.#app.use(cors());
        this.#app.use(morgan("dev"));
        this.#app.use(this.#express.json());
        this.#app.use(this.#express.urlencoded({ extended : true }));
        this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
        this.#app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition : {
                openapi: "3.0.0",
                info : {
                    title : "Store Application",
                    version : "1.0.0",
                    description : "فروشگاه خرید محصولات فیزیکی و مجازی",
                    contact : {
                        name : "Mohammad Mahdi Hosseini",
                        email : "moh79hosseini@gmail.com"
                    }
                },
                servers : [
                    {
                        url : "http://localhost:5000",
                    },
                ],
                components:{
                    securitySchemes: {
                        BearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT"
                        }
                    }
                },
                security: [{ BearerAuth : [] }]
            },
            apis : ["./app/router/**/*.js"]
        }),
        {
            explorer : true
        }))
    }
    connectToMongoDB(DB_URL){
        const mongoose = require("mongoose");
        mongoose.connect(DB_URL, (error) => {
            if(error) return console.log(error.message);
            return console.log("Connect to MongoDB successfully...");
        });
        mongoose.connection.on("connected", () => {
            console.log("mongoose connect to DB.");
        });
        mongoose.connection.on("disconnected", () => {
            console.log("mongoose disconnected!");
        });
        process.on("SIGINT", async() => {
            await mongoose.connection.close();
            process.exit(0);
        })
    }
    initRedis(){
        require("./utils/init_redis");
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
        const createError = require("http-errors");
        this.#app.use((req, res, next) => {
            next(createError.NotFound("مسیر مورد نظر یافت نشد"));
        });
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError();
            const status = error?.status || serverError.status;
            const message = error?.message || serverError.message;
            return res.status(status).json({
                errors : {
                    status,
                    message
                }
            })
        });
    }
}