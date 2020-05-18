
exports.up = function(knex) {
    return knex.schema.createTable("epa_vehicles_all", (tbl) => {
        tbl.increments();
        tbl.string("make").notNullable();
        tbl.string("model").notNullable();
        tbl.integer("year").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("epa_vehicles_all");
};
