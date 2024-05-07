const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.findUserByCredentials = async function (email, password) {
    try {
        const user = await this.findOne({ email });
        const matched = await bcrypt.compare(password, user.password);

        if (!user || !matched) {
            throw new Error("Неправильные почта или пароль");
        }

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = mongoose.model("user", userSchema);
