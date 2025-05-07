const router = require("express").Router();
const fs = require("fs");
const path = require("path");

let cards = [];

const file = path.join(__dirname, "..", "data", "cards.json");
fs.readFile(file, (error, data) => {
  if (error) {
    console.log(error);
    cards = { error: "Setor de cartões em manutenção" };
    return;
  }
  cards = JSON.parse(data);
});

router.get("/", (req, res) => {
  if (cards.error) {
    return res.status(404).json(cards);
  }
  return res.json(cards);
});

module.exports = router;
