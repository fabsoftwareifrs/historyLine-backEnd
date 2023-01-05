require("dotenv").config();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async login({ email, password }) {
    const userExist = await User.findOne({
      where: {
        email,
      },
    });
    if (!userExist) throw new Error("Usario não encontrado");
    const passwordValid = await bcrypt.compare(
      password,
      userExist.passwordHash
    );
    if (!passwordValid) throw new Error("Creadenciais Invalidas");

    const payLoad = {
      userId: userExist.id,
      userName: userExist.name,
    };

    const token = jwt.sign(payLoad, process.env.SECRET_KEY, {
      expiresIn: "999h",
    });

    return token;
  },
};
