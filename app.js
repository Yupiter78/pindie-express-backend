const express = require("express");
const bodyParser = require("body-parser");
const { cors } = require("./middlewares/cors");
const apiRouter = require("./routes/apiRouter");

const path = require("path");
const connectToDatabase = require("./database/connect");

const app = express();
const PORT = 3000;

connectToDatabase();

app.use(
    cors,
    bodyParser.json(),
    apiRouter,
    express.static(path.join(__dirname, "public"))
);

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});
