const { Card } = require("../models/Card");

async function getCards() {
  console.log(Card);
  try {
    const cards = await Card.find();
    return cards;
  } catch (err) {
    throw new Error(`ERROR - [DBGET] Cards - ${err.message}`);
  }
}

async function deleteCard(id) {
  try {
    const card = await Card.deleteOne({ _id: id });
    return card;
  } catch (err) {
    throw new Error(`ERROR - [DBGET] Card-ID - ${err.message}`);
  }
}

async function createCard({ name, link, id }) {
  try {
    const newCard = await Card({ name, link, owner: id });
    const createdCard = await newCard.save();
    return createdCard;
  } catch (err) {
    throw new Error(`ERROR - [DBCREATE] Card - ${err.message}`);
  }
}

module.exports = { getCards, deleteCard, createCard };
