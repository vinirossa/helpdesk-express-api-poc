import express from "express";

// Controllers
import { router as UserController, BASE_PATH as UserBasePath } from "../../business/user/user.controller";
import { router as IncidentController } from "../../business/incident/incident.controller";

export const router = express.Router();

// Endpoints
router.use(UserBasePath, UserController);
router.use("", IncidentController);
