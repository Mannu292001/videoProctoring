import express from "express";
import { saveLog, getLogs,start } from "../controllers/logsController.js";

const router = express.Router();

router.post("/start",start)
router.post("/save", saveLog);
router.get("/:interviewId", getLogs);

export default router;
