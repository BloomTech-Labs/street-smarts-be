const express = require("express");
const cors = require('cors');

const Cars = require("./cars/model");
const carsRouter = require('./cars/router');
const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/cars', carsRouter);

server.get('/api/make', (req, res) => {
    Cars.getMake().then(make => {
        res.status(200).json(make);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Failed to get make of car"});
    })
});

server.get("/api/year", (req, res) => {
    Cars.getYears().then(years => {
        res.status(200).json(years);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "Failed to get list of years" });
    })
})

server.get("/api/model", (req, res) => {
    Cars.getModel().then(models => {
        res.status(200).json(models);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Failed to get car model"});
    });
})

server.get("/", (req, res) => {
    res.json({ message: "Server up and running" });
  });

module.exports = server;
