const express = require("express");

const router = express.Router();
const { getSinglePrediction } = require('./model');

//POST /api/predict
router.post("/:id", getSinglePrediction("predict"));

module.exports = router;