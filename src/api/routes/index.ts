import express from "express";

// Controllers
import { router as EnumController, BASE_URL as EnumBaseUrl } from "../../business/enum/enum.controller";
import { router as UserController, BASE_URL as UserBaseUrl } from "../../business/user/user.controller";
import { router as IncidentController, BASE_URL as IncidentBaseUrl } from "../../business/incident/incident.controller";

const router = express.Router();

// Endpoints
router.use(EnumBaseUrl, EnumController);
router.use(UserBaseUrl, UserController);
router.use(IncidentBaseUrl, IncidentController);

export default router;
