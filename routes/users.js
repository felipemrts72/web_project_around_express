const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  userUpdate,
} = require("../controllers/users");

router.get("/", async (req, res, next) => {
  try {
    const users = await getUsers();
    return res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    return res.json(user);
  } catch (err) {
    err.message = "Usuário inexistente!";
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    const error = new Error("Campos obrigatórios ausentes");
    error.name = "CastError";
    return next(error);
  }

  try {
    const newUser = await createUser({ name, about, avatar });
    return res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, about } = req.body;

  console.log("REQ.BODY:", req.body);

  if (!name || !about) {
    const error = new Error("Campos obrigatórios ausentes");
    error.name = "CastError";
    return next(error);
  }

  try {
    const updateUser = await userUpdate({ name, about, id });
    return res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
