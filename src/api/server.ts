/* eslint-disable no-console */
/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import * as dotenv from "dotenv";
dotenv.config();

import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";

import swaggerJSDoc from "swagger-jsdoc";
import router from "./routes";

import { errorHandler } from "./middlewares/error-handler/error-handler.middleware";
import { localizer } from "./middlewares/localizer/localizer";
import swaggerDoc from "./docs/swagger.json";
import pgdb from "../db/postgres";
import redis from "../cache/redis";

class Server {
    private readonly VERSION: number = 1;

    private readonly API_BASE_URL: string = `/api/v${this.VERSION}`;

    private readonly app: express.Application;

    constructor() {
        this.app = express();
        this.configureDefaults();
        this.configureSwagger();
        this.setBeforeMiddlewares();
        this.setRoutes();
        this.setAfterMiddlewares();
    }

    private configureDefaults(): void {
        this.app.set("port", process.env.PORT);
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.disable("x-powered-by");
    }

    private configureSwagger(): void {
        const swaggerSpec = swaggerJSDoc({
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "Helpdesk API POC",
                    version: "v1",
                    description:
                        "This is a REST API application that serves an Helpdesk, made with Express and TypeScript.",
                    license: {
                        name: "Licensed Under MIT",
                        url: "https://spdx.org/licenses/MIT.html",
                    },
                    contact: {
                        name: "Vinícius Pereira",
                        email: "viniciuspsb@gmail.com",
                    },
                },
                servers: [
                    {
                        url: "http://localhost:3000",
                        description: "Development Server",
                    },
                ],
            },
            apis: ["src/business/**/*.controller.ts"],
        });
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
        // this.app.get("/api-docs", swaggerUi.setup(swaggerDocument));
    }

    private setBeforeMiddlewares(): void {
        this.app.use(localizer.init);
    }

    private setRoutes(): void {
        this.app.use(express.Router().use(this.API_BASE_URL, router));
    }

    private setAfterMiddlewares(): void {
        this.app.use(errorHandler);
    }

    // eslint-disable-next-line class-methods-use-this
    private configureDatabase(): void {
        pgdb.initialize()
            .then(() => {
                pgdb.manager.query("SET TIME ZONE 'America/Sao_Paulo';")
                    .then(() => {})
                    .catch((err) => { throw err; });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // eslint-disable-next-line class-methods-use-this
    private configureCache(): void {
        redis.connect()
            .then(() => { })
            .catch((err) => {
                console.log(err);
            });
    }

    public start(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}...`);
        });
        this.configureDatabase();
        this.configureCache();
    }
}

const server = new Server();
server.start();
