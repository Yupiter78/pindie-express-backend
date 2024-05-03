const users = require("../models/user");

const findAllUsers = async (req, res, next) => {
    req.usersArray = await users.find({});
    next();
};

const createUser = async (req, res, next) => {
    console.log("POST /users");
    try {
        console.log("req.body: ", req.body);
        req.user = await users.create(req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(
            JSON.stringify({ message: "Ошибка создания пользователя" })
        );
    }
};

const findUserById = async (req, res, next) => {
    console.log("GET /users/:id");
    try {
        res.user = await users.findById(req.params.id);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(
            JSON.stringify({ message: "ользователь не найден" })
        );
    }
};

module.exports = { findAllUsers, createUser, findUserById };
