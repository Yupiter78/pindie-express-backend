const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Необходима авторизация" });
    }

    const token = authorization.replace("Bearer ", "");
    try {
        req.user = jwt.verify(token, "some-secret-key");
    } catch (error) {
        return res.status(401).json({ message: "Необходима авторизация" });
    }

    next();
};

module.exports = { checkAuth };
