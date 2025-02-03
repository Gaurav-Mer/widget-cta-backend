import express from "express";
import { createWidget, getWidgets, authenticateToken, editWidget } from "../controllers/widgetController.js";
const router = express.Router();

router.post("/add", authenticateToken, createWidget);
router.get("/list", authenticateToken, getWidgets);
router.put('/:id', authenticateToken, editWidget);


export default router;
