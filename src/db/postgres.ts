/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { DataSource } from "typeorm";

const pgdb = new DataSource({
    type: "postgres",
    url: process.env.DB_PG_URL!,
    synchronize: false,
    logging: true,
    migrationsRun: true,
    migrationsTableName: "migrations",
    entities: ["src/business/**/*.model.ts"],
    migrations: ["src/db/migrations/*.ts"],
    subscribers: [],
});

export default pgdb;
