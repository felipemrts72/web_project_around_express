const express = require("express");
const mongoose = require("mongoose");
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

const mainPage = (req, res, next) => {
  if (req.url === "/") {
    return res.status(404).json({
      message: "A solicitação não foi encontrada, página ainda em produção",
    });
  }
  return next();
};
app.use((req, res, next) => {
  req.user = {
    _id: "683e6e39ec2eb288b1efeedf",
  };

  next();
});

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
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
