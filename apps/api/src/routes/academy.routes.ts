import { Router } from "express";
import { createBatch, createProgram, listBatches, listCoaches, listPrograms, listStudents } from "../controllers/academy.controller.js";
import { authenticate, authorize } from "../middleware/auth.js";

export const programRouter = Router();
programRouter.get("/", listPrograms);
programRouter.post("/", authenticate, authorize("admin"), createProgram);

export const batchRouter = Router();
batchRouter.get("/", authenticate, listBatches);
batchRouter.post("/", authenticate, authorize("admin"), createBatch);

export const userManagementRouter = Router();
userManagementRouter.get("/students", authenticate, authorize("admin", "coach"), listStudents);
userManagementRouter.get("/coaches", authenticate, authorize("admin"), listCoaches);
