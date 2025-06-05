const router = require("express").Router();
const { getCards, deleteCard, createCard } = require("../controllers/cards");

router.get("/", async (req, res, next) => {
  try {
    const cards = await getCards();
    return res.json(cards);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteCard(id);
    return res
      .status(204)
      .json({ message: `Cartão - ${id} - deletado com sucesso!` });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  try {
    if (!name || !link || !_id) {
      const err = new Error("Campos obrigatórios ausentes");
      err.name = "CastError";
      throw err;
    }

    const newCard = await createCard({ name, link, id: _id });
    return res.status(201).json(newCard);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
