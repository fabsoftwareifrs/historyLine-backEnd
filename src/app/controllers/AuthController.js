const HttpResponse = require("../http/httpResponse.js");
const { login } = require("../usecase/user/index.js");

module.exports = {
  async auth(req, res) {
    const { email, password } = req.body;
    try {
      const userToken = await login({ email, password });
      HttpResponse.ok(res, userToken);
    } catch (error) {
      HttpResponse.badRequest(res, error.message);
    }
  },
};
