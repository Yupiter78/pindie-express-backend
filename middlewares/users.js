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

const updateUser = async (req, res, next) => {
    try {
        req.user = await users.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.status(400).json({ message: "Ошибка обновления пользователя" });
    }
};

deleteUser = async (req, res, next) => {
    try {
        req.user = users.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.status(400).json({ message: "Ошибка удаления пользователя" });
    }
};

const checkIsUserExists = async (req, res, next) => {
    const isInArray = req.usersArray.find(
        (user) => user.email === req.body.email
    );
    if (isInArray) {
        res.status(400).json({
            message: "Пользователь с таким email уже существует"
        });
    } else {
        next();
    }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ message: "Введите имя, email и пароль" });
    } else {
        next();
    }
};
const checkEmptyNameAndEmail = async (req, res, next) => {
    const { username, email } = req.body;
    if (!username || !email) {
        res.status(400).json({ message: "Введите имя и email" });
    } else {
        next();
    }
};

module.exports = {
    findAllUsers,
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    checkIsUserExists
};
