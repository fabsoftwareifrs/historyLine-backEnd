module.exports = (...dataHistory) => {
  const diff = dataHistory[dataHistory.length - 1] - dataHistory[0];

  const dataSelect = dataHistory;

  // Percore os dados e adiciona o calculo de possição

  const dataFormatted = dataSelect.map((e, i) => {
    switch (e) {
      case dataHistory[0]:
        return 0;
      case dataHistory[dataHistory.length - 1]:
        return (e - dataSelect[i - 1]) / diff;
      default:
        return (e - dataSelect[i - 1]) / diff;
    }
  });
  return dataFormatted;
};
