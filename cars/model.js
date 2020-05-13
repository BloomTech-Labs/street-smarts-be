const db = require("../data/dbconfig");

module.exports = {
  search,
  searchById,
  getModel,
  getYears,
  getMake
};

function search(orderBy, page, where) {
  const limit = 10;
  return db("epa_vehicles_all")
    .select()
    .where(where)
    .orderBy(orderBy)
    .offset(limit * page)
    .limit(limit);
}

function searchById(id) {
  return db("epa_vehicles_all").select().where({ id }).first();
}

function getModel() {
    return db("epa_vehicles_all").distinct("model");
}

function getMake() {
    return db("epa_vehicles_all").distinct("make");
}

function getYears() {
    return db("epa_vehicles_all").distinct("year");
}