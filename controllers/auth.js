const users = require("../models/user");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await users.findUserByCredentials(email, password);

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
