const express = require("express");
const mongoose = require("mongoose");
const mainPage = require("./middlewares/mainPage");
const userId = require("./middlewares/userId");
const errorHandler = require("./middlewares/errorHandler");

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conexão com MongoDB estabelecida com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use(userId);
app.use("/", mainPage);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use("*splat", (req, res, next) => {
  const err = new Error("NotFound");
  err.name = "NotFound";
  next(err);
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
