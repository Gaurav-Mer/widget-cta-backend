import express from "express";
import { createWidget, getWidgets, authenticateToken, editWidget, deleteWidget, getWidget } from "../controllers/widgetController.js";
const router = express.Router();
router.use(authenticateToken);
router.post("/add", createWidget);
router.get("/list", getWidgets);
router.put('/:id', editWidget);
router.delete('/delete/:id', deleteWidget);
router.get('/public/:id', getWidget);


export default router;
