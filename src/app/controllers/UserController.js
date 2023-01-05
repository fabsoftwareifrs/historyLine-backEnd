require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { schemaStore } = require("../validation");
const { storeUser } = require("../useCase/user");
const HttpResponse = require("../http/httpResponse.js");
const { User, Room } = require("../models/index.js");

module.exports = {
  async store(req, res) {
    const { email, name, password } = req.body;
    try {
      await schemaStore.validate(req.body);
      const userCreateToken = await storeUser({
        name,
        email,
        password,
      });
      HttpResponse.ok(res, {
        token: userCreateToken,
        authenticated: true,
      });
    } catch (error) {
      HttpResponse.badRequest(res, error.message);
    }
  },
  async update(req, res) {
    const { name, privater, password } = req.body;
    const { id } = req.userId;
    const data = { name, privater, password };
    // ... Find the user and verify if it exist
    try {
      const userUpdate = await User.update(data, { where: { id } });
      HttpResponse.ok(res, userUpdate);
    } catch (error) {
      HttpResponse.serverError(res, error.message);
    }
    res.json(user);
  },
};
