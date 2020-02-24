const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);  //Socket component
server.listen(PORT);
console.log(`Sockets & Server are running on Port ${PORT}`);

const groupH = require('./Socket/GroupHandler');
const groupHandler = new groupH;
module.exports = groupHandler;
require('./Socket')(io);

const apiRouter = require("./Router");
const bodyParser = require("body-parser");
const cors = require('cors');
 
const mongoConnection = require("./Database/db");
mongoConnection.connect( () =>{

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));

      app.use(cors()); // <---- use cors middleware
      app.use("/api", apiRouter);
      //console.log(mongoConnection.get()) //works!
})
