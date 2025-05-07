const router = require("express").Router();
const fs = require("fs");
const path = require("path");

let users = [];

const file = path.join(__dirname, "..", "data", "users.json");
fs.readFile(file, (error, data) => {
  if (error) {
    console.log(error);
    users = { error: "Setor de usuários em manutenção" };
    return;
  }
  users = JSON.parse(data);
});

router.get("/", (req, res) => {
  if (users.error) {
    return res.status(404).json(users);
  }
  return res.json(users);
});
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((us) => us._id === id);

  if (users.error) {
    return res.status(404).json(users);
  }
  if (!user) {
    return res
      .status(404)
      .json({ message: `ID - ${id} -  do usuário não encontrado` });
  }
  return res.json(user);
});

module.exports = router;
