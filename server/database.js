import knex from "knex";

export default knex(require("./knexfile")[process.env.NODE_ENV]);
