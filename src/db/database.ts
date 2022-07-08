/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import pg from "pg";
const PG_DECIMAL_OID = 1700;
pg.types.setTypeParser(PG_DECIMAL_OID, parseFloat);

import knex from "knex";
import knexfile from "./knexfile";

const configOptions = knexfile[process.env.NODE_ENV!];

export const db = knex(configOptions);
