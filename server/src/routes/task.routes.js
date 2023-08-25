import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  updateTask,
} from "../controllers/task.controllers.js";

const router = Router();

router.post("/create", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.get("/", getAllTask);

export default router;
