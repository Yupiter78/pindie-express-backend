const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/pindie";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("Успешно подключились к MongoDB");
    } catch (error) {
        console.log("При подключение к MongoDB произошла ошибка");
        console.log("error: ", error);
    }
};

module.exports = connectToDatabase;
