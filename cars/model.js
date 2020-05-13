const db = require("../data/dbconfig");

module.exports = {
  search,
  searchById
};

function search() {
  return db("epa_vehicles_all").select().limit(20);
}

function searchById(id) {
    return db("epa_vehicles_all").select().where({ id }).first();
}