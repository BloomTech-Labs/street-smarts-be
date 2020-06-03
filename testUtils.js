const db = require("./data/dbconfig.js");

const EXAMPLE_CARS = [
  {
    id: 1,
    make: "Tesla",
    model: "X",
    year: 2018,
  },
  {
    id: 2,
    make: "Ford",
    model: "F150",
    year: 2017,
  },
];

function setupExampleData() {
  return db("epa_vehicles_all")
    .truncate()
    .then(() => db("epa_vehicles_all").insert(EXAMPLE_CARS));
}

module.exports = {
  EXAMPLE_CARS,
  setupExampleData,
};
