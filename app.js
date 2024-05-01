const express = require("express");
const bodyParser = require("body-parser");
const { cors } = require("./middlewares/cors");
const mainRoute = require("./routes/main");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(
    cors,
    bodyParser.json(),
    express.static(path.join(__dirname, "public")),
    mainRoute
);

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});
