import { Router } from "express";
import { createAdmission, listAdmissions, updateAdmissionStatus } from "../controllers/admission.controller.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

export const admissionRouter = Router();

admissionRouter.post("/", upload.array("documents", 6), createAdmission);
admissionRouter.get("/", authenticate, authorize("super_admin", "academy_admin", "head_coach", "coach", "admin"), listAdmissions);
admissionRouter.patch("/:id/status", authenticate, authorize("super_admin", "academy_admin", "admin"), updateAdmissionStatus);
