const usersRouter = require("express").Router();

const {
    findAllUsers,
    createUser,
    findUserById,
    updateUser
} = require("../middlewares/users");
const {
    sendAllUsers,
    sendUserById,
    sendUserUpdated
} = require("../controllers/users");

usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.post("/users", findAllUsers, createUser, sendAllUsers);
usersRouter.put("users/:id", updateUser, sendUserUpdated);

module.exports = usersRouter;
