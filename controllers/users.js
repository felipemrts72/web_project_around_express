const User = require("../models/User");

async function getUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw new Error(`ERROR - [DBGET] USERS - ${err.message}`);
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    throw new Error(`ERROR - [DBGET] USER-ID - ${err.message}`);
  }
}

async function createUser({ name, about, avatar }) {
  console.log(avatar);

  try {
    //--------------- está errado ---------------
    // const linkvalidator = /^http?:\/\//;
    // const isValidAvatar = avatar.match(linkvalidator);
    // if (!isValidAvatar) {
    //   throw new Error({
    //     message: `Avatar Link ${avatar} is invalid`,
    //     statusCode: 422,
    //   });
    // }
    const newUser = await User({ name, about, avatar });
    console.log(newUser);
    const createdUser = await newUser.save();
    return createdUser;
  } catch (err) {
    throw new Error(`ERROR - [CREATE] USER - ${err.message}`);
  }
}

module.exports = { getUsers, getUserById, createUser };
