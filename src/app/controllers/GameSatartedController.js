const HttpResponse = require("../http/httpResponse");
const { startGame } = require("../useCase/game/");
module.exports = {
  async started(req, res) {
    const { room_id } = req.params;
    try {
      const gameData = await startGame(room_id);
      HttpResponse.ok(res, gameData);
    } catch (error) {
      HttpResponse.badRequest(res, error.message);
    }
  },
};
