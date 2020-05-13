const express = require("express");

const Cars = require("./model");

const router = express.Router();

//GET /api/cars
router.get("/", (req, res) => {
  const page = req.query.page || 0;
  const orderBy = "year";
  const where = {};
  if (req.query.make) {
      where.make = req.query.make;
  }
  if (req.query.model) {
      where.model = req.query.model;
  }
  if (req.query.year) {
      where.year = req.query.year;
  }
  Cars.search(orderBy, page, where)
    .then((rows) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: { message: "Failed to retrieve cars from database" } });
    });
});

//GET /api/cars/:id
router.get("/:id", (req, res) => {
    const { id } = req.params;

    Cars.searchById(id)
    .then(cars => {
        if (cars) {
            res.json(cars);
        } else {
            console.log(cars)
            res.status(404).json({ message: "Couldn't find car with given ID"})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Failed to get cars"});
    });
});

module.exports = router;
