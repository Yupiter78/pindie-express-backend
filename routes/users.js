const usersRouter = require("express").Router();

const {
    findAllUsers,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    checkEmptyNameAndEmail,
    checkEmptyNameAndEmailAndPassword,
    checkIsUserExists
} = require("../middlewares/users");
const {
    sendAllUsers,
    sendUserById,
    sendUserUpdated,
    sendUserDeleted
} = require("../controllers/users");

usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.post(
    "/users",
    findAllUsers,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    createUser,
    sendAllUsers
);
usersRouter.put(
    "users/:id",
    checkEmptyNameAndEmail,
    updateUser,
    sendUserUpdated
);
usersRouter.delete("users/:id", deleteUser, sendUserDeleted);

module.exports = usersRouter;
