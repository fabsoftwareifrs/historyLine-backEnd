class HttpResponse {
  static badRequest(res, message) {
    return res.status(400).json({ message });
  }
  static ServerError(res, message) {
    return res.status(500).json({ message });
  }
  static ok(res, message) {
    return res.status(200).json({ message });
  }
}
module.exports = HttpResponse;
