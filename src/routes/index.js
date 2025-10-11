const homeRouter = require("./home");
const authRouter = require("./auth");
const adminRouter = require("./admin");
const userRouter = require("./user");

function route(app) {
  app.use("/", homeRouter);
  app.use("/auth", authRouter);
  app.use("/user", userRouter);


}

module.exports = route;
