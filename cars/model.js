const db = require("../data/dbconfig");

module.exports = {
  search,
  searchById,
  getModel,
  getYears,
  getMake,
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

function getModel(where) {
  return db("epa_vehicles_all").distinct("model").where(where);
}

function getMake(where) {
  return db("epa_vehicles_all").distinct("make").where(where);
}

function getYears(where) {
  return db("epa_vehicles_all").distinct("year").where(where);
}
