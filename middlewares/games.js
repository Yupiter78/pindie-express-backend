const games = require("../models/game");

const findAllGames = async (req, res, next) => {
    req.gamesArray = await games
        .find({})
        .populate("categories")
        .populate({ path: "users", select: "-password" });
    next();
};

const createGame = async (req, res, next) => {
    console.log("POST /games");
    try {
        console.log(req.body);
        req.game = await games.create(req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(
            JSON.stringify({ message: "Ошибка создания игры" })
        );
    }
};

const findGameById = async (req, res, next) => {
    console.log("GET /games/:id");
    try {
        req.game = await games
            .findById(req.params.id)
            .populate("categories")
            .populate({
                path: "users",
                select: "-password"
            });
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(404).send(JSON.stringify({ message: "Игра не найдена" }));
    }
};

const updateGame = async (req, res, next) => {
    try {
        req.game = await games.findByIdAndUpdate(req.params.id, req.body);
        next();
    } catch (error) {
        res.setHeader("Content-Type", "application/json");
        res.status(400).send(
            JSON.stringify({ message: "Ошибка обновления игры" })
        );
    }
};

const deleteGame = async (req, res, next) => {
    try {
        req.game = await games.findByIdAndDelete(req.params.id);
        next();
    } catch (error) {
        res.status(400).json({ message: "Ошибка удаления игры" });
    }
};

const checkEmptyFields = async (req, res, next) => {
    const { title, description, image, link, developer } = req.body;
    if (!title || !description || !image || !link || !developer) {
        res.status(400).json({ message: "Заполните все поля!" });
    } else {
        next();
    }
};

const checkIfCategoriesAvaliable = async (req, res, next) => {
    const { categories } = req.body;
    if (!categories || categories.length === 0) {
        res.status(400).json({ message: "Выберите хотя бы одну категрию" });
    } else {
        next();
    }
};

const checkIfUsersAreSafe = async (req, res, next) => {
    const { users } = req.body;
    if (!users) {
        next();
        return;
    }
    if (users.length - 1 === req.game.users.length) {
        next();
    } else {
        res.status(400).json({
            message:
                "Нельзя удалять пользователей или добавлять более одного пользователя"
        });
    }
};

module.exports = {
    findAllGames,
    createGame,
    findGameById,
    updateGame,
    deleteGame,
    checkEmptyFields,
    checkIfCategoriesAvaliable,
    checkIfUsersAreSafe
};
