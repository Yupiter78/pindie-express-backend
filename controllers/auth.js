const users = require("../models/user");
const jwt = require("jsonwebtoken");
const path = require("path");

const login = async (req, res) => {
    console.log("Login route called");
    const { email, password } = req.body;
    try {
        const user = await users.findUserByCredentials(email, password);
        const token = jwt.sign({ _id: user._id }, "some-secret-key", {
            expiresIn: 3600
        });

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            jwt: token
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const sendDashboard = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
};

const sendIndex = (req, res) => {
    const sendIndexPage = () =>
        res.sendFile(path.join(__dirname, "../public/index.html"));
    if (req.cookies.jwt) {
        try {
            jwt.verify(req.cookies.jwt, "some-secret-key");
            return res.redirect("/admin/dashboard");
        } catch (error) {
            sendIndexPage();
        }
    }
    sendIndexPage();
};

module.exports = { login, sendIndex, sendDashboard };
