const { User } = require("../models/User");

async function getUsers() {
  const users = await User.find();
  if (users.length === 0) {
    const err = new Error("Nenhum usuário encontrado");
    err.name = "NotFound";
    console.error(`ERROR - [DBGET] Users - ${err.message}`);
    throw err;
  }
  return users;
}

async function getUserById(id) {
  try {
    const user = await User.findById(id).orFail(() => {
      const err = new Error("CastError");
      err.name = "CastError";
      throw err;
    });
    return user;
  } catch (err) {
    console.error(`ERROR - [DBGET] USER-ID - ${err.message}`);
    throw err;
  }
}

async function createUser({ name, about, avatar }) {
  try {
    const newUser = await User({ name, about, avatar });
    const createdUser = await newUser.save();
    return createdUser;
  } catch (err) {
    console.error(`ERROR - [DBPOST] CREATE USER - ${err.message}`);
    err.name = "ValidationError";
    throw err;
  }
}

async function userUpdate({ name, about, id }) {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true, upsert: false },
    ).orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.name = "NotFound";
      throw err;
    });
    return user;
  } catch (err) {
    console.error(`ERROR - [DBUPDT] USER-UPDATE - ${err.message}`);
    throw err;
  }
}

async function userAvatarUpdate({ avatar, id }) {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true, upsert: false },
    ).orFail(() => {
      const err = new Error("Usuário não encontrado");
      err.name = "NotFound";
      throw err;
    });
    return user;
  } catch (err) {
    console.error(`ERROR - [DBUPDT] USER-UPDATE - ${err.message}`);
    throw err;
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  userUpdate,
  userAvatarUpdate,
};
