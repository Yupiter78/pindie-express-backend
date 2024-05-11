const mongoose = require("mongoose");
const categoryModel = require("./category");
const userModel = require("./user");

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    developer: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: userModel
        }
    ],

    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: categoryModel
        }
    ]
});

gameSchema.statics.findGameByCategory = async function (category) {
    try {
        const games = await this.find({})
            .populate({
                path: "categories",
                match: { name: category }
            })
            .populate({ path: "users", select: "-password" })
            .lean();

        return games.filter((game) => game.categories.length > 0);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = mongoose.model("game", gameSchema);
