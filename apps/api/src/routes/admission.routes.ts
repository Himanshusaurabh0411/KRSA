import { Router } from "express";
import { createAdmission, listAdmissions, updateAdmissionStatus } from "../controllers/admission.controller.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

export const admissionRouter = Router();

admissionRouter.post("/", upload.array("documents", 6), createAdmission);
admissionRouter.get("/", authenticate, authorize("admin", "coach"), listAdmissions);
admissionRouter.patch("/:id/status", authenticate, authorize("admin"), updateAdmissionStatus);
