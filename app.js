import express from "express";

const { PORT = 3000 } = process.env;
const app = express();

app.get("/", (req, res) => {
  return res.json({ funcionando: "ok" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
