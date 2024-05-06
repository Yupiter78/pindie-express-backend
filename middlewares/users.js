const users = require("../models/user");
const bcrypt = require("bcryptjs");

const findAllUsers = async (req, res, next) => {
    console.log("GET /api/users");
    req.usersArray = await users.find({}, { password: 0 });
    next();
};

const createUser = async (req, res, next) => {
    console.log("POST /api/users");
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
    console.log("GET /api/users/:id");
    try {
        res.user = await users.findById(req.params.id, { password: 0 });
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(
            JSON.stringify({ message: "Пользователь не найден" })
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

const deleteUser = async (req, res, next) => {
    try {
        req.user = await users.findByIdAndDelete(req.params.id);
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

const hashPassword = async (req, res, next) => {
    console.log("HASH_PASSWORD");
    try {
        console.log("req.body.password: ", req.body.password);
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        console.log("req.body.password__2: ", req.body.password);
        next();
    } catch (error) {
        res.status(400).json({ message: "Ошибка хеширования пароля" });
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
    checkIsUserExists,
    hashPassword
};
