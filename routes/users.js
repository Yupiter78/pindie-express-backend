const usersRouter = require("express").Router();

const { findAllUsers, createUser } = require("../middlewares/users");
const { sendAllUsers } = require("../controllers/users");

usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.post("/users", findAllUsers, createUser, sendAllUsers);

module.exports = usersRouter;
