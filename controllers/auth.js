const users = require("../models/user");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users.findOne({ email });
        const matched = await bcrypt.compare(password, user.password);
        if (!user || !matched) {
            throw new Error("Неправильная почта или пароль");
        }

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = { login };
