const router = require("express").Router();
const { getCards, deleteCard, createCard } = require("../controllers/cards");

router.get("/", async (req, res) => {
  try {
    const cards = await getCards();
    return res.json(cards);
  } catch (error) {
    return res.status(500).json({
      message: `Não foi possível solicitar os cartões - [GET], ERROR: ${error}`,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCard(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(404).json({
      message: `Não foi possível deleter o usuário com o ID: ${id} - [DELETE] ERROR: ${error}`,
    });
  }
});

router.post("/", async (req, res) => {
  const { name, link } = req.body;
  const { id } = req.user._id;

  try {
    const newCard = await createCard({ name, link, id });
    return res.status(201).json(newCard);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: ` Não foi possivel criar o cartão - [POST] ERROR: ${error}`,
    });
  }
});

module.exports = router;
