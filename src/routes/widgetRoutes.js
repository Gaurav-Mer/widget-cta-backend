import express from "express";
import { createWidget, getWidgets } from "../controllers/widgetController.js";
const router = express.Router();

router.post("/", createWidget);
router.get("/", getWidgets);

export default router;
