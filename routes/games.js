const gamesRouter = require("express").Router();
const {
    findAllGames,
    createGame,
    findGameById,
    updateGame,
    deleteGame
} = require("../middlewares/games");
const {
    sendAllGames,
    sendGameCreated,
    sendGameById,
    sendGameUpdated,
    sendGameDeleted
} = require("../controllers/games");

gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.post("/games", findAllGames, createGame, sendGameCreated);
gamesRouter.put("/games/:id", findGameById, updateGame, sendGameUpdated);
gamesRouter.delete("/games/:id", deleteGame, sendGameDeleted);

module.exports = gamesRouter;
