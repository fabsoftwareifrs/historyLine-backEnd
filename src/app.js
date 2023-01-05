const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
module.exports = class Server {
  app = express();

  constructor(PORT_SERVER) {
    this.start(PORT_SERVER);
    this.middleware();
    this.router();
  }
  start(PORT_SERVER) {
    this.app.listen(PORT_SERVER, () => {
      console.log(
        `[HTTP] Server is listen in -> http://localhost:${PORT_SERVER} `
      );
    });
  }
  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  router() {
    this.app.use("/api", routes);
  }
};
