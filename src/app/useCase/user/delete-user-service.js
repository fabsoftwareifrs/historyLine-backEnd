const User = require("../../models/User");
module.exports = {
  async deleteUser(id) {
    try {
      const userDeleted = User.destroy({
        where: { id },
      });
      return userDeleted;
    } catch (error) {
      return error;
    }
  },
};
