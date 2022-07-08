/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import * as dotenv from "dotenv";
dotenv.config();

import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";

import { router as routes } from "./routes";
import { errorHandler } from "./middlewares/error-handler/error-handler.middleware";

const app = express();

// API Signature
export const VERSION: number = 1;
export const API_BASE_PATH: string = `/api/v${VERSION}`;

// Express Defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Before Middlewares

// Routes
export const router = express.Router();
app.use(router.use(API_BASE_PATH, routes));

// After Middlewares
app.use(errorHandler);

// Start server
app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${process.env.PORT}...`);
});
