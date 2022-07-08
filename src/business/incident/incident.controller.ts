/* eslint-disable @typescript-eslint/require-await */
import express from "express";

export const router = express.Router();

// Endpoints
router.get("/incidents", async (req, res) => {
    res.status(200).send("");
});
