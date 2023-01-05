require("dotenv/config");

const Server = require("./app");

const PORT_SERVER = 3001;
new Server(PORT_SERVER);
