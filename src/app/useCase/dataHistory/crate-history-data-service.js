const { HistoryData } = require("../../models/index.js");
module.exports = {
  async storeHistory({ data, year, hint, room_id }) {
    const historyData = {
      data,
      hint,
      year,
      room_id,
    };
    try {
      await HistoryData.create(historyData, {
        include: [{ model: HistoryData }],
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
