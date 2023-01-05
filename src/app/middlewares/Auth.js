require("dotenv").config();
const jwt = require("jsonwebtoken");
const HttpResponse = require("../http/httpResponse");

const checkToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return HttpResponse.badRequest(res, "Não possui um token");
  }
  try {
    const accessToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = accessToken.userId;
    req.userId = userId;

    next();
  } catch (error) {
    res.status(400).json({ msg: "Token invalido !!" }).status(501).end();
  }
};

module.exports = {
  checkToken,
};
