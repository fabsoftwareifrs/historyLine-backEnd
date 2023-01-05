const { Data } = require("../../models");

module.exports = {
  async startGame(room_id) {
    const dataHistory = await Data.findAll({
      where: { room_id },
      order: [["year", "ASC"]],
    });
    if (dataHistory.length === 0) throw new Error("Sala não encontrada");

    const diff = dataHistory[dataHistory.length - 1].year - dataHistory[0].year;
    const min = 1;
    const max = dataHistory.length - 2;
    const randomData = Math.floor(Math.random() * (max - min + 1)) + min;

    const dataSelect = [
      dataHistory[0],
      dataHistory[randomData],
      dataHistory[dataHistory.length - 1],
    ];

    const dataFormatted = dataSelect.map(({ id, data, hint, year }, i) => {
      switch (id) {
        case dataHistory[0].id:
          return {
            id: id,
            calcYear: 0,
            data: data,
            description: hint,
          };
        case dataHistory[dataHistory.length - 1].id:
          return {
            id: id,
            calcYear: (year - dataSelect[i - 1].year) / diff,
            data: data,
            description: hint,
          };
        default:
          return {
            id: id,
            data: data,
            calcYear: (year - dataSelect[i - 1].year) / diff,
            hint: hint,
            answer: true,
          };
      }
    });
    return dataFormatted;
  },
};
