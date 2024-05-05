const apiRouter = require("express").Router();
const gamesRouter = require("./games");
const categoriesRouter = require("./categories");
const usersRouter = require("./users");

apiRouter.use("/api", gamesRouter);
apiRouter.use("/api", categoriesRouter);
apiRouter.use("/api", usersRouter);

module.exports = apiRouter;
