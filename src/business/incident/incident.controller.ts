/* eslint-disable @typescript-eslint/require-await */
import express from "express";

export const router = express.Router();
export const BASE_URL = "/incidents";

// Endpoints
router.get(BASE_URL, async (req, res) => {
    res.status(200).send("");
});
