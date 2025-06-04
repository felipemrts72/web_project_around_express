const router = require("express").Router();
const { getUsers, getUserById, createUser } = require("../controllers/users");

router.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    return res.json(users);
  } catch (error) {
    return res.status(404).json({ message: `Error [GET] - ${error.message}` });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    if (!user) {
      throw new Error("");
    }
    return res.json(user);
  } catch (error) {
    return res
      .status(404)
      .json({ message: `ID - ${id} -  do usuário não foi encontrado` });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body.name);
  const { name, about, avatar } = req.body;
  console.log(about);
  try {
    const newUser = await createUser({ name, about, avatar });
    return res.status(201).json(newUser);
  } catch (error) {
    return res
      .status(404)
      .json({ message: `[POST] - Não foi possivel criar o usuário` });
  }
});

module.exports = router;
