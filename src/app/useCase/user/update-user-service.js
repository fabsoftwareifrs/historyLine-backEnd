const User = require("../../models/User");
module.exports = {
  async updateUser(id, data) {
    try {
      const alter = await User.update(data, { where: { id } });
      return alter;
    } catch (error) {
      throw new Error(error);
    }
  },
};
