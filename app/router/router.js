const redisClient = require("../utils/init_redis");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRoutes } = require("./user/auth");
const router = require("express").Router();

/* (async()=>{
    await redisClient.set("key", "value");
    const value = await redisClient.get("key");
    console.log(value);
}
)(); */

router.use("/user", UserAuthRoutes);
router.use("/developer", DeveloperRoutes)
router.use("/", HomeRoutes);

module.exports = {
    AllRoutes : router,
};