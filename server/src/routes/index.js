import { Router } from "express";

import taskRoutes from "./task.routes.js";

const router = Router();

router.use("/tasks", taskRoutes);

export default router;
