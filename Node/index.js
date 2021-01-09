const server = require("./server")
const route = require("./route");

server.start(8888,route.routing,route.handle);