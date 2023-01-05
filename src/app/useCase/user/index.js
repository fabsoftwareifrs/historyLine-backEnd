const { login } = require("./login-user-service");
const { deleteUser } = require("./delete-user-service");
const { storeUser } = require("./create-user-service");
const { updateUser } = require("./update-user-service");

module.exports = {
  deleteUser,
  login,
  storeUser,
  updateUser,
};
