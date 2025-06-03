const { use } = require("react");
const UserModel = require("../models/User");

async function usersList() {
  try {
    const users = await UserModel.find();
    return users;
  } catch (err) {
    throw new Error(`ERROR - [GET] USERS - ${err}`);
  }
}
