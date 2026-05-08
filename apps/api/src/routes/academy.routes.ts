import { Router } from "express";
import { createBatch, createProgram, listBatches, listCoaches, listPrograms, listStudents } from "../controllers/academy.controller.js";
import { authenticate, authorize } from "../middleware/auth.js";

export const programRouter = Router();
programRouter.get("/", listPrograms);
programRouter.post("/", authenticate, authorize("super_admin", "academy_admin", "admin"), createProgram);

export const batchRouter = Router();
batchRouter.get("/", authenticate, listBatches);
batchRouter.post("/", authenticate, authorize("super_admin", "academy_admin", "admin"), createBatch);

export const userManagementRouter = Router();
userManagementRouter.get("/students", authenticate, authorize("super_admin", "academy_admin", "head_coach", "coach", "admin"), listStudents);
userManagementRouter.get("/coaches", authenticate, authorize("super_admin", "academy_admin", "admin"), listCoaches);
