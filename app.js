const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

const { cors } = require("./middlewares/cors");
const apiRouter = require("./routes/apiRouter");
const pagesRouter = require("./routes/pages");
const connectToDatabase = require("./database/connect");

const app = express();
const PORT = 3001;

connectToDatabase();

app.use(
    cors,
    cookieParser(),
    bodyParser.json(),
    pagesRouter,
    apiRouter,
    express.static(path.join(__dirname, "public"))
);

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});
