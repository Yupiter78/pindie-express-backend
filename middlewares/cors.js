const allowedCors = [
    "http://localhost:3000",
    "http://localhost:3001"
];

const cors = (req, res, next) => {
    const { origin } = req.headers;
    if (allowedCors.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Добавляем "Authorization" в список разрешенных заголовков
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Credentials", "true");
    }

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
};

module.exports = { cors };

