
exports.up = function (knex) {
    return knex.schema.withSchema("public").createTable("users", (table) => {
        table.increments();
        table.string("username");
        table.string("email");
        table.string("password");
        table.timestamps();
    })
        .then();
};

exports.down = function (knex) {
    return knex.schema
        .withSchema("public")
        .dropTable("users")
        .then();
};
