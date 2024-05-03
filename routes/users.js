const usersRouter = require("express").Router();

const {
    findAllUsers,
    createUser,
    findUserById
} = require("../middlewares/users");
const { sendAllUsers, sendUserById } = require("../controllers/users");

usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.post("/users", findAllUsers, createUser, sendAllUsers);

module.exports = usersRouter;
