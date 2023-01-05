require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/index.js");
module.exports = {
  async storeUser({ name, email, password }) {
    const passwordHash = await bcrypt.hash(password, 12);
    const userData = {
      name,
      email,
      passwordHash,
    };
    try {
      const newUser = await User.create(userData);
      const { id, name } = newUser;
      const payLoad = {
        userId: id,
        userName: name,
      };
      const token = jwt.sign(payLoad, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });

      return token;
    } catch (error) {
      throw new Error(error);
    }
  },
};
