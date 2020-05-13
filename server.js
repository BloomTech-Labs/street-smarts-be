const express = require("express");
const cors = require('cors');

const carsRouter = require('./cars/router');
const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/cars', carsRouter);

server.get("/", (req, res) => {
    res.json({ message: "Server up and running" });
  });

module.exports = server;
