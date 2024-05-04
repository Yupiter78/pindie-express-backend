const usersRouter = require("express").Router();

const {
    findAllUsers,
    createUser,
    findUserById,
    updateUser,
    deleteUser
} = require("../middlewares/users");
const {
    sendAllUsers,
    sendUserById,
    sendUserUpdated,
    sendUserDeleted
} = require("../controllers/users");

usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.post("/users", findAllUsers, createUser, sendAllUsers);
usersRouter.put("users/:id", updateUser, sendUserUpdated);
usersRouter.delete("users/:id", deleteUser, sendUserDeleted);

module.exports = usersRouter;
