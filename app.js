const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const articlesRouter = require("./routes/api/articles");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/articles", articlesRouter);

app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
