const express = require("express");

const { PORT = 3000 } = process.env;
const app = express();

const mainPage = (req, res, next) => {
  if (req.url === "/") {
    return res.status(404).json({
      message: "A solicitação não foi encontrada, página ainda em produção",
    });
  }
  return next();
};

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use("/", mainPage);
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use("*splat", (req, res) => {
  res
    .status(404)
    .send({ message: "Desculpe, a solicitação não foi encontrada" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
