import express from "express";
import { getWidget } from "../controllers/widgetController.js";

const router = express.Router();

router.get('/:id', getWidget);
export default router